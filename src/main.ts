import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// Application entry point
async function bootstrap() {
  // Create the NestJS application instance
  const app = await NestFactory.create(AppModule);

  // Enable CORS for the deployed frontend domain(s) using an environment variable
  // Set CORS_ORIGIN in your Render environment (comma-separated for multiple origins)
  const allowedOrigins = (process.env.CORS_ORIGIN ?? '').split(',').map(origin => origin.trim()).filter(Boolean);
  app.enableCors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : false, // false disables CORS if not set
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
  await app.listen(process.env.PORT ?? 3000);
}

// Bootstrap the application
bootstrap();
