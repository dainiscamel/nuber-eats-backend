import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Verification } from './entities/verification.entity';
import { UsersResolver } from './users.resolver';
import { UserService } from './users.service';

@Module({
  //app에 설정된 ConfigModule을 ConfigService로 선언하여 user 에서 사용 할 수 있다.
  imports: [TypeOrmModule.forFeature([User,Verification])],
  providers: [UsersResolver, UserService],
  exports: [UserService]
})


export class UsersModule {}
 