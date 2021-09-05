import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { Restaurant } from './restaurants/entities/restaurant.entity';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { User } from './users/entities/user.entity';
import { JwtModule } from './jwt/jwt.module';
import { JwtMiddleware } from './jwt/jwt.middleware';
import { AuthModule } from './auth/auth.module';
import { Verification } from './users/entities/verification.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile:process.env.NODE_ENV === 'prod',
      validationSchema: Joi.object({
        
        NODE_ENV: Joi.string()
          .valid('dev', 'prod')
          .required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        PRIVATE_KEY: Joi.string().required()
      })
    }),
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: true,
        logging: process.env.NODE_ENV !== 'prod',
        entities: [User,Verification],
    }),
    
    // Dynamic Module
    // Codefirst 접근 방식에서는 데코레이터와 TypeScript 클래스를 사용하여 해당 GraphQL 스키마를 생성
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      // apollo server context ?  함수가 정의되면 매 request마다 호출된다.
      context:({req}) => ({user: req['user']})
    }),
    // Static Module
    UsersModule,
    JwtModule.forRoot({
      privateKey: process.env.PRIVATE_KEY
    }),
    
  ],
  controllers: [],
  providers: [],
})

export class AppModule implements NestModule{
  configure(consumer:MiddlewareConsumer){
    //JwtMiddleware을 forRoutes를 통해서 /graphql 경로에 리퀘스트 시 (GET,POST etc ..) 적용 (apply)
    consumer.apply(JwtMiddleware).forRoutes({
      path:"/graphql",
      method:RequestMethod.POST,
    })
  }
}

