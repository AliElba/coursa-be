import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for Stripe Checkout session response
 */
export class StripeCheckoutSessionDto {
  @ApiProperty({ description: 'Stripe Checkout session URL' })
  url: string;
} 