import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateRestaurantDto } from "./dtos/create-restaurant.dto";
import { Restaurant } from "./entities/restaurant.entity";

//Restaurant의 리졸버로 설정
@Resolver(of=> Restaurant)
export class RestaurantResolver{
  @Query(returns => [Restaurant])
  restaurant(@Args('veganOnly') veganOnly: boolean):Restaurant[]{
    return[];
  }


  @Mutation(returns => Boolean)
  // dto에서 @InputType을 사용한 경우 객체 전달
  // createRestaurant(@Args() createRestaurantInput: CreateRestaurantDto): boolean {
  createRestaurant(@Args() createRestaurantDto: CreateRestaurantDto): boolean {
    return true;
  }
}  