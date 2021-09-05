import { v4 as uuidv4 } from 'uuid';
import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreEntity } from "src/common/entities/core.entity";
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { User } from "./user.entity";

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Verification extends CoreEntity{

  @Column()
  @Field(type => String)
  code:string;

  //CASCADE를 사용하여 user 삭제 시 붙어있는 verification도 같이 삭제.
  @OneToOne(type=> User, {onDelete:"CASCADE"})
  @JoinColumn()
  user:User

  @BeforeInsert()
  createCode():void {
    this.code = uuidv4();
  }
}