import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppConfigService } from './core/configuration.service';

// Application entry point
async function bootstrap() {
  // Create the NestJS application instance
  const app = await NestFactory.create(AppModule);

  // Get AppConfigService instance
  const appConfig = app.get(AppConfigService);

  // Enable CORS for the deployed frontend domain(s) using AppConfigService
  app.enableCors({
    origin: appConfig.corsOrigins.length > 0 ? appConfig.corsOrigins : false, // false disables CORS if not set
    credentials: true,
  });

  // Configure Swagger/OpenAPI documentation
  const config = new DocumentBuilder()
    .setTitle('Coursa API')
    .setDescription('API documentation for Coursa backend')
    .setVersion('1.0')
    .addBearerAuth() // Add JWT bearer authentication to Swagger UI
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Serve Swagger UI at /api

  // Start the application on the specified port (default 3000)
  await app.listen(appConfig.port);
}

// Bootstrap the application
bootstrap();
