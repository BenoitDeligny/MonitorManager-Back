import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalInterceptor } from './shared/interceptors/global.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalInterceptors(new GlobalInterceptor());
  await app.listen(3000);
}
bootstrap();
