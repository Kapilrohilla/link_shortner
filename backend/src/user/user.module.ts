import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/Schema/user.schema';
import { AuthContoller } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forFeature([{ name: 'users', schema: UserSchema }]),
    JwtModule.register({
      global: true,
      secret: process.env.JWTCONSTANT,
    }),
  ],
  controllers: [UserController, AuthContoller],
  providers: [UserService, AuthService],
  exports: [MongooseModule],
})
export class UserModule {}
