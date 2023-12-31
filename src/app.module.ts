import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './shared/filters/AllExceptionFilter';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_FILTER,
    useClass: AllExceptionsFilter
  }],
})
export class AppModule {}
