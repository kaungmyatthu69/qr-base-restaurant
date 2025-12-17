import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseWrapperInterceptor } from './common/interceptors/response-wrapper.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 1. Use a GLOBAL Exception Filter for consistent error responses (e.g., 404, 500)
  // app.useGlobalFilters(new ());

  // 2. Use a GLOBAL Interceptor for consistent successful response structure (the Envelope)
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new ResponseWrapperInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
