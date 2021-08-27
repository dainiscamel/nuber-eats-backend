import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateRestaurantDto } from "./dtos/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dtos/update-restaurant.dto";
import { Restaurant } from "./entities/restaurant.entity";
import { RestaurantService } from "./restaurants.service";

//Restaurant의 리졸버로 설정
@Resolver(of=> Restaurant)
export class RestaurantResolver{
  // RestaurantService에서 repository를 사용하기 위해 RestaurantResolver에 import
  constructor(private readonly restaurantService: RestaurantService) {}

  @Query(returns => [Restaurant])
  restaurants(): Promise<Restaurant[]>{
    return this.restaurantService.getAll();
  }

  @Mutation(returns => Boolean)
  // dto에서 @InputType을 사용한 경우 객체 전달
  // createRestaurant(@Args('input') createRestaurantInput: CreateRestaurantDto): boolean {
    async createRestaurant(
      @Args('input') createRestaurantDto: CreateRestaurantDto,
    ): Promise<boolean> {
      try {
        await this.restaurantService.createRestaurant(createRestaurantDto);
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
  }

  @Mutation(returns => Boolean)
  async updateRestaurant(
    @Args('input') updateRestaurantDto: UpdateRestaurantDto,
    ): Promise<boolean> {
      try {
        await this.restaurantService.updateRestaurant(updateRestaurantDto);
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
  }
}  