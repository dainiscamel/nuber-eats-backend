import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantResolver } from './restaurants.resolver';
import { RestaurantService } from './restaurants.service';

@Module({
  // TypeORM을 이용해서 Restaurant repositoty를 import
  imports : [TypeOrmModule.forFeature([Restaurant])],
  providers: [RestaurantResolver,RestaurantService]
})
export class RestaurantsModule {
  
}
