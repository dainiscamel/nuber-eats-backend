import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Response } from "express";
import { Request } from "express";
import { User } from "src/users/entities/user.entity";
import { UserService } from "src/users/users.service";
import { JwtService } from "./jwt.service";

// implements ?  NestMiddleware interface 처럼 행동하도록 상속
@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if ('token' in req.headers) {
      const token = req.headers['token'];
      try {
        const decoded = this.jwtService.verify(token.toString());
        if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
          const user = await this.userService.findById(decoded['id']);
          req['user'] = user;
        }
      } catch (e) {
        console.log(e);
      }
    }
    next();
  }
} 
