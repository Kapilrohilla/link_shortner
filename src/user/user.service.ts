import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { user } from 'src/interface/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class userServiceHelper {
  isValidEmail(email: string): boolean {
    const regex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;
    return regex.test(email);
  }
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }
}
export class UserService extends userServiceHelper {
  constructor(@InjectModel('users') private userModel: Model<user>) {
    super();
  }

  async fetchAllUser() {
    const limit = 20;
    return await this.userModel.find({}).limit(limit);
  }

  async getSpecificUser(id: string): Promise<'invalid id' | user> {
    try {
      return await this.userModel.findById(id).populate('shorturls');
    } catch (err) {
      return 'invalid id';
    }
  }

  async createUser(userDetail: user): Promise<string | user> {
    if (!userDetail.first_name) {
      return 'first_name is required';
    } else if (!(userDetail.email && this.isValidEmail(userDetail.email))) {
      return 'Email not provided or incorrect';
    } else if (!userDetail.password) {
      return 'Password is required';
    }
    const hash = await this.hash(userDetail.password);

    delete userDetail.password;
    try {
      const newuser = new this.userModel({
        ...userDetail,
        hash,
      });
      console.log(newuser);
      return await newuser.save();
    } catch (err) {
      if (err.message.includes('duplicate key error')) {
        return 'user already exists';
      } else {
        return 'something went wrong';
      }
    }
  }

  async deleteUser(id: string): Promise<user> {
    try {
      return await this.userModel.findByIdAndDelete(id);
    } catch (err) {
      throw new HttpException('invalid id', HttpStatus.BAD_REQUEST);
    }
  }
}
