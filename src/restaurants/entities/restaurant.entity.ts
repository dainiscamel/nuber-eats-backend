import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsOptional, IsString, Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

//isAbstract를 사용하여 InputType이 스키마에 포함되지 않게 하고,다른 type으로 변형하여 사용할 수 있다.
// @InputType({isAbstract:true})
//데코레이터를 이용하여 class 하나로 Graphql 스키마돠 DB에 저장 되는 실제 데이터형식을 만들 수 있다.
@ObjectType()
@Entity()
export class Restaurant{
  @Field(type => Number) // Graphql
  @PrimaryGeneratedColumn() // DB
  id: number;

  @Field(type => String)
  @Column()
  @IsString()
  @Length(5)
  name: string;

  @Field(type => Boolean, { nullable: true })
  @Column({ default: true })
  @IsOptional()
  @IsBoolean()
  isVegan: boolean;

  @Field(type => String, { defaultValue: '강남' })
  @Column()
  @IsString()
  address: string;
}