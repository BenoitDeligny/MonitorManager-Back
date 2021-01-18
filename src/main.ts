import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as csurf from 'csurf';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // app.use(csurf()); // ! Protection against exploit (unauthorized commands) => Mettre en place cookie-parser ou cookie-session
  app.use(helmet()); // ! Protection against HTTP vulnerabilities
  await app.listen(3000);
}
bootstrap();
