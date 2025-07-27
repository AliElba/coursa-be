import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for returning payment status and reference information.
 */
export class PaymentStatusDto {
  /**
   * Unique payment reference ID.
   */
  @ApiProperty({ description: 'Unique payment reference ID.' })
  reference: string;

  /**
   * Email associated with the payment.
   */
  @ApiProperty({ description: 'Email associated with the payment.' })
  email: string;

  /**
   * Payment status (e.g., 'pending', 'paid', 'failed').
   */
  @ApiProperty({ description: "Payment status ('pending', 'paid', 'failed')." })
  status: string;

  /**
   * Payment amount.
   */
  @ApiProperty({ description: 'Payment amount.' })
  amount: number;

  /**
   * Course ID related to the payment.
   */
  @ApiProperty({ description: 'Course ID related to the payment.' })
  courseId: number;
} 