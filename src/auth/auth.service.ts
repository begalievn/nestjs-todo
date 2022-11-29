import { Injectable } from '@nestjs/common';
import { UsersService } from "../users/users.service";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne({username});
    if(user && user.password === pass) {
      const result = {
        userId: user._id.valueOf(),
        username: user.username
      }
      return result;
    }
    return null;
  }

  async login(user: any) {
    try{
      const payload = { userId: user.userId, username: user.username };
      return {
        access_token: this.jwtService.sign(payload)
      }
    }catch (e){
      console.log(e.message)
    }
  }

  async register(user) {
    try {
      return await this.userService.createUser(user);
    } catch(e) {
      console.log(e.message);
    }
  }
}
