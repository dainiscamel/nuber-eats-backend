import {  InputType, OmitType } from '@nestjs/graphql';
import { Restaurant } from '../entities/restaurant.entity';

 // InputType? Object를 argument로 graphql에 전달하기 위한 용도.
// ArgsType? 분리된 값들을 argument로 graphql에 전달하기 위한 용도.
// @ArgsType()

@InputType()
// OmitType 으로 가져온 Restaurant가 ObjectType 이므로 이를 InputType로 변형하여 사용 할 수 있다. 
export class CreateRestaurantDto extends OmitType(Restaurant, ['id'],InputType) {}