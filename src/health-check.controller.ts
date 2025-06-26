import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

// Controller for health check endpoint
@ApiTags('health') // Group under 'health' in Swagger UI
@Controller('health')
export class HealthCheckController {
  /**
   * Health check endpoint
   * Returns status ok if the service is running.
   */
  @Get()
  @ApiOperation({ summary: 'Health check', description: 'Returns status ok if the service is running.' })
  @ApiResponse({ status: 200, description: 'Service is healthy', schema: { example: { status: 'ok' } } })
  check() {
    // Simple health check response
    return { status: 'ok' };
  }
} 