import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { CoreEntity } from "src/common/entities/core.entity";
import * as bcrypt from 'bcrypt';   
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from "typeorm";
import { InternalServerErrorException } from "@nestjs/common";
import { IsBoolean, IsEmail, IsEnum, IsString, isString } from "class-validator";
import { Restaurant } from "src/restaurants/entities/restaurant.entity";

// enum은 데이터베이스 graphql을 위해서 그리고 decorator을 위해서 사용.
export enum UserRole {
  Client = 'Client',
  Owner = 'Owner',
  Delivery = 'Delivery',
}

registerEnumType(UserRole, {name: "UserRole"})

@InputType('UserInputType',{ isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity{
  @Column({ unique: true })
  @Field(type => String)
  @IsEmail()
  email: string;

  @Column({select: false})
  @Field(type => String)
  @IsString()
  password: string;

  @Column(
    {type: 'enum', enum: UserRole}
  )
  @Field(type => UserRole)
  @IsEnum(UserRole)
  role: UserRole;

  @Column({default:false})
  @Field(type => Boolean)
  @IsBoolean()
  verified: boolean;

  @Field(type=> [Restaurant])
  // 어떤 entity에서 적용되는지 작성
  @OneToMany(type => Restaurant, restaurant => restaurant.owner)
  restaurants: Restaurant[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword():Promise<void>{
    if(this.password){ 
     try{
        // DB에 저장 되기 전에 user.service 파일 내에 create로 instance를 생성.
        this.password = await bcrypt.hash(this.password,10)
      }catch(e){
        throw new InternalServerErrorException()
      }
    }
  }

  async checkPassword(clientPassword: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(clientPassword, this.password);
      return ok; 
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}