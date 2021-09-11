import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsOptional, IsString, Length } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Restaurant } from "./restaurant.entity";

//isAbstract를 사용하여 InputType이 스키마에 포함되지 않게 하고,다른 type으로 변형하여 사용할 수 있다.
@InputType('CategoryInputType',{isAbstract:true})
//데코레이터를 이용하여 class 하나로 Graphql 스키마돠 DB에 저장 되는 실제 데이터형식을 만들 수 있다.
@ObjectType()
@Entity()
export class Category extends CoreEntity{
  @Field(type => String) // Graphql
  @Column() // DB
  @IsString()
  @Length(5)
  name: string;

  @Field(type => String)
  @Column()
  @IsString()
  coverImg: string; 

  @Field(type=> [Restaurant])
  // 어떤 entity에서 적용되는지 작성
  @OneToMany(type => Restaurant,restaurant => restaurant.category)
  restaurants: Restaurant[];
}