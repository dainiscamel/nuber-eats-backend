import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth-user.decorator";
import { User } from "src/users/entities/user.entity";
import { CreateRestaurantInput, CreateRestaurantOutput } from "./dtos/create-restaurant.dto";
import { Restaurant } from "./entities/restaurant.entity";
import { RestaurantService } from "./restaurants.service";

//Restaurant의 리졸버로 설정
@Resolver(of=> Restaurant)
export class RestaurantResolver{
  // RestaurantService에서 repository를 사용하기 위해 RestaurantResolver에 import
  constructor(private readonly restaurantService: RestaurantService) {}

  @Mutation(returns => CreateRestaurantOutput)
  // dto에서 @InputType을 사용한 경우 객체 전달
  // createRestaurant(@Args('input') createRestaurantInput: CreateRestaurantInput): boolean {
    async createRestaurant(
      @AuthUser() authUser:User,
      @Args('input') createRestaurantInput: CreateRestaurantInput,
    ): Promise<CreateRestaurantOutput> {
      return  this.restaurantService.createRestaurant(authUser,createRestaurantInput);
  }
}  