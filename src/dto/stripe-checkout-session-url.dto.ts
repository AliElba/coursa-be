import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for returning the Stripe Checkout session URL to the frontend.
 * Used when creating a new Stripe Checkout session for payment.
 */
export class StripeCheckoutSessionUrlDto {
  /**
   * The Stripe Checkout session URL to redirect the user for payment.
   * Example: https://checkout.stripe.com/pay/cs_test_123...
   */
  @ApiProperty({ description: 'Stripe Checkout session URL' })
  url: string;
} 