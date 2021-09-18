import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { User } from "src/users/entities/user.entity";
import { AllowedRoles } from "./role.decorator";

// CanActivate ? true를 리턴하면 request를 진행시키고 false면 리퀘스트를 멈춘다.
@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private readonly reflector:Reflector){}
  // 모든 guard는 canActivate() 함수를 implement해야 한다. 이 함수는 현재의 request가 실행될 수 있는지 없는지를 나타내는 boolean을 리턴.
  //route의 roles에 접근하기 위해,  Reflector라는 helper class를 사용.
  canActivate(context: ExecutionContext){
    const roles = this.reflector.get<AllowedRoles>(
      'roles',
      context.getHandler(),
    );
    if(!roles){
      // metadata를 가지지 않는 resolver는 public resolver.
      // request 진행을 허용
      return true;
    }
    
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const user:User = gqlContext["user"];
    // gqlContext에 유저가 없다면 유저에게 valid token이 없는 유저.(=로그인 하지 않은 유저)
    if(!user){
      return false;  
    }
    if(roles.includes("Any")){
      // 모든사람이 접근가능한 Resolver.
      return true;
    }
    return roles.includes(user.role);
  }
}