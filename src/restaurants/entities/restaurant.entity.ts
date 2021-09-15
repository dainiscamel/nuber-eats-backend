import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsString, Length } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Category } from "./category.entity";

//isAbstract를 사용하여 InputType이 스키마에 포함되지 않게 하고,다른 type으로 변형하여 사용할 수 있다.
@InputType('RestaurantInputType',{isAbstract:true})
//데코레이터를 이용하여 class 하나로 Graphql 스키마돠 DB에 저장 되는 실제 데이터형식을 만들 수 있다.
@ObjectType()
@Entity()
export class Restaurant extends CoreEntity{
  @Field(type => String) // Graphql
  @Column() // DB
  @IsString()
  @Length(5)
  name: string;

  @Field(type => String)
  @Column()
  @IsString()
  coverImg: string;

  @Field(type => String, { defaultValue: '강남' })
  @Column()
  @IsString()
  address: string;

  // 레스토랑은 오직 하나의 카테고리만 가직 수 있다.
  @Field(type => Category,{nullable:true})
  @ManyToOne(type=> Category, category=> category.restaurants,{
    nullable:true, onDelete: 'SET NULL'
  })
  category: Category;

  @Field(type => User,{nullable:true})
  @ManyToOne(type=> User, category=> category.restaurants)
  owner: User;

}