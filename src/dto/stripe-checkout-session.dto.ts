import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for verifying a Stripe Checkout session after payment.
 * Used when the frontend is redirected back from Stripe and needs to verify the payment status.
 */
export class StripeCheckoutSessionDto {
  /**
   * The Stripe Checkout session ID to verify.
   * Example: cs_test_1234567890abcdef
   */
  @ApiProperty({ description: 'The Stripe Checkout session ID to verify.' })
  sessionId: string;
} 