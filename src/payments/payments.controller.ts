import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { StripeCheckoutSessionDto } from '../dto/stripe-checkout-session.dto';
import { PaymentStatusDto } from '../dto/payment-status.dto';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { CurrentUser } from '../current-user.decorator';
import { UserDto } from '../dto/user.dto';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  /**
   * Verify a Stripe session, save/update the payment, and return payment info.
   * Requires authentication and only allows the user to verify their own payment.
   */
  @Post('verify-session')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Verify Stripe session and update payment status' })
  @ApiBody({ type: StripeCheckoutSessionDto })
  @ApiOkResponse({ type: PaymentStatusDto })
  async verifyStripeSession(
    @Body() dto: StripeCheckoutSessionDto,
    @CurrentUser() user: UserDto
  ): Promise<PaymentStatusDto> {
    return this.paymentsService.verifyStripeSession(dto.sessionId, user.id);
  }
}
