import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

// CanActivate ? true를 리턴하면 request를 진행시키고 false면 리퀘스트를 멈춘다.
@Injectable()
export class AuthGuard implements CanActivate{
  canActivate(context: ExecutionContext){
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const user = gqlContext["user"];
    if(!user){
      return false;  
    }
    return true;
  }
}