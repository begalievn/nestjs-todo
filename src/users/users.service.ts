import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./entities/user.model";
import { Model } from 'mongoose';


@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  async findOne(searchQuery): Promise<any | undefined> {
    let result = await this.userModel.findOne(searchQuery).exec();
    return result;
  }

  async createUser(user) {
    const result = await this.userModel.create(user);
    return result;
  }
}
