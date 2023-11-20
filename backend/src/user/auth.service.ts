import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { signin } from 'src/interface/signin.interface';
import { responseUserData, user } from 'src/interface/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('users') private userModel: Model<user>,
    private jwtService: JwtService,
  ) {}

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    const isEqual = await bcrypt.compare(password, hash);
    return isEqual;
  }

  async login(userCredential: signin): Promise<user | string> {
    if (!(userCredential.email && userCredential.password)) {
      return 'email, password is required';
    }
    const user: responseUserData & {
      __v: string;
    } = await this.userModel
      .findOne({
        email: { $eq: userCredential.email },
      })
      .lean();
    // /*
    if (!user) {
      return 'user not found';
    }
    if (!(await this.verifyPassword(userCredential.password, user.hash))) {
      return 'incorrect password';
    }
    delete user._id;
    delete user.__v;
    const token = await this.jwtService.signAsync(user.email);
    const userDetailWithToken = { ...user, token };

    return userDetailWithToken;
    // */
  }
}
