import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module';
import { generateDocument } from './doc'
import { RemoveSensitiveUserInfoInterceptor } from './shared/interceptors/remove-sensitive-info.interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe())

  generateDocument(app);

  app.useGlobalInterceptors(new RemoveSensitiveUserInfoInterceptor)

  await app.listen(8100);
}
bootstrap();
