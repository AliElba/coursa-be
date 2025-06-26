# How to Set Up Swagger (OpenAPI) in This Project

## Summary
This guide explains how to enable Swagger (OpenAPI) documentation in your NestJS backend. Swagger provides an interactive API documentation UI and generates an OpenAPI spec, which can be used by frontend tools like `@openapitools/openapi-generator-cli` to generate client code.

## Steps

### 1. Install Dependencies
Install the required packages:
```bash
npm install --save @nestjs/swagger swagger-ui-express
```

### 2. Add Swagger Setup to `main.ts`
Edit your `src/main.ts` file to include the Swagger setup:
```typescript
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Coursa API')
    .setDescription('API documentation for Coursa backend')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
```

### 3. Add Swagger Decorators to Controllers
- Use `@ApiTags`, `@ApiOperation`, `@ApiResponse`, and other decorators from `@nestjs/swagger` to document your endpoints.
- Example for a controller:
```typescript
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @Post('google')
  @ApiOperation({ summary: 'Authenticate with Google' })
  @ApiResponse({ status: 201, description: 'JWT and user info returned.' })
  async googleLogin(@Body('idToken') idToken: string) {
    // ...
  }
}
```

### 4. Run the App and Access Swagger UI
Start your NestJS app:
```bash
npm run start:dev
```
Visit [http://localhost:3000/api](http://localhost:3000/api) to view the Swagger UI and download the OpenAPI spec.

### 5. Use the OpenAPI Spec for Frontend Generation
You can now use the OpenAPI spec with tools like `@openapitools/openapi-generator-cli` to generate frontend API clients.

---

**Tip:**
- Keep your controllers and DTOs well-documented for the best OpenAPI output.
- Update the Swagger docs whenever you add or change endpoints. 