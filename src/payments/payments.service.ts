import { Injectable, NotFoundException, InternalServerErrorException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PaymentStatusDto } from '../dto/payment-status.dto';
import Stripe from 'stripe';
import { AppConfigService } from '../core/configuration.service';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor(private prisma: PrismaService, private appConfig: AppConfigService) {
    this.stripe = new Stripe(this.appConfig.stripeSecretKey, {
      apiVersion: '2025-06-30.basil',
    });
  }

  /**
   * Verifies a Stripe session, saves/updates the payment, and returns payment info.
   * Only allows the user to verify their own payment.
   * @param sessionId Stripe Checkout session ID
   * @param userId Current user's ID
   */
  async verifyStripeSession(sessionId: string, userId: number): Promise<PaymentStatusDto> {
    try {
      // Retrieve the Stripe session
      const session = await this.stripe.checkout.sessions.retrieve(sessionId);
      if (!session) throw new NotFoundException('Stripe session not found');

      // Extract info from session
      const email = session.customer_details?.email || session.customer_email || '';
      const amount = session.amount_total ? session.amount_total / 100 : 0;
      const status = session.payment_status || 'pending';
      const metadata = session.metadata || {};
      const courseId = metadata.courseId ? Number(metadata.courseId) : undefined;
      const sessionUserId = metadata.userId ? Number(metadata.userId) : undefined;

      if (!courseId || !sessionUserId) {
        throw new InternalServerErrorException('Missing courseId or userId in session metadata');
      }

      // Only allow the user to verify their own payment
      if (sessionUserId !== userId) {
        throw new ForbiddenException('You are not allowed to access this payment');
      }

      // Upsert payment record
      const payment = await (this.prisma as any).payment.upsert({
        where: { sessionId },
        update: {
          status,
          amount,
          email,
        },
        create: {
          sessionId,
          status,
          amount,
          email,
          courseId,
          userId: sessionUserId,
        },
      });

      // Return payment info
      return {
        reference: payment.id,
        email: payment.email,
        status: payment.status,
        amount: payment.amount,
        courseId: payment.courseId,
      };
    } catch (err) {
      throw new InternalServerErrorException('Failed to verify Stripe session');
    }
  }
}
