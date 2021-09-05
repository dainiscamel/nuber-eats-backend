import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { JwtService } from 'src/jwt/jwt.service';
import { EditProfileInput } from './dtos/edit-profile.dto';
import { Verification } from './entities/verification.entity';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Verification)
    private readonly verifications: Repository<Verification>,
    private readonly jwtService: JwtService
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<{ ok: boolean; error?: string }> {
    try {
      const exists = await this.users.findOne({ email });
      if (exists) {
        return { ok: false, error: 'There is a user with that email already' };
      }

      // create: entity를 생성, save :DB에 저장
      const user = await this.users.save(this.users.create({ email, password, role }));
      await this.verifications.save(
        this.verifications.create({
          user,
        }),
      );
      return { ok: true };
    } catch (e) {
      return { ok: false, error: "Couldn't create account" };
    }
  }

  async login({email,password}:LoginInput):Promise<{ ok: boolean; error?: string; token?: string }>{
    // find  the user with the email

    
    try {
      // findOne메소드는 select시 배열에 명시된 필드들만 반환하도록 설계되어있기때문에 id,password 둘다 명시를 해주어야 한다. 
      const user = await this.users.findOne({email},{
        select: ['id','password']
      })
      if(!user){
        return{
          ok:false,
          error: "User not found."
        }
      }

      //check password is correct
      const isPassword = await user.checkPassword(password);
      if(!isPassword){
        return {
          ok: false,
          error: "Password is not correct."
        }
      }
      // json wev token은 암호화의 목적인 아닌 토큰의 유효한 인증( ex) 토큰이 외부에 의해서 수정되더라도 original 토큰과 비교하여 유효한 토큰인지를 확인 할 수 있음.)을 할 수 있게 한다. 
      // const token = jwt.sign({id : user.id},this.config.get('SECRET_KEY') )
      const token = this.jwtService.sign(user.id);
      return {
        //make a JWT and give it to the user
        ok: true,
        token
      }
    }catch(error){
       return {
        ok:false,
        error
       }
    }
  }

  async findById(id: number): Promise<User> {
    return this.users.findOne({ id });
  }

  async editProfile(
    userId: number,
    { email, password }: EditProfileInput,
  ): Promise<User> {
    const user = await this.users.findOne(userId);
    if (email) {
      user.email = email;
      user.verified = false;
      await this.verifications.create({
        user
      })
    }
    if (password) {
      user.password = password;
    }
    return this.users.save(user);
  }

  async verifyEmail(code:string) :Promise<boolean>{
    try {
      const verification = await this.verifications.findOne(
        { code },
        { relations: ['user'] },
      );
      if (verification) {
        verification.user.verified = true;
        console.log(verification.user);
        this.users.save(verification.user);
        return true;
      }
      throw new Error();
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}