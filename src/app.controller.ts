import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

// Controller for the root application endpoints
@ApiTags('app') // Group under 'app' in Swagger UI
@Controller()
export class AppController {
  // Inject AppService to provide business logic
  constructor(private readonly appService: AppService) {}

  /**
   * Root endpoint
   * Returns a hello world message.
   */
  @Get()
  @ApiOperation({ summary: 'Root endpoint', description: 'Returns a hello world message.' })
  @ApiResponse({ status: 200, description: 'Hello World message', schema: { example: 'Hello World!' } })
  getHello(): string {
    // Delegate to AppService for the message
    return this.appService.getHello();
  }
}
