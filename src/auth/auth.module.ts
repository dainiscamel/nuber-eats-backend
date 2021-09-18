import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  providers:[{
    // nest는 모든 resolver를 실행하기 전에 authGuard를 실행.
    provide: APP_GUARD,
    useClass: AuthGuard,
  }]
})
export class AuthModule {}
