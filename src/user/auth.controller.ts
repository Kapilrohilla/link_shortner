import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { singinDto } from 'src/dto/signIn.dto';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthContoller {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({
    description: 'token is created and available in response with user details',
  })
  @ApiBadRequestResponse({
    description: 'email or password in responsebody is in incorrect format',
  })
  @HttpCode(200)
  @Post('login')
  async signin(@Body() singinDto: singinDto) {
    const r = await this.authService.login({
      email: singinDto.email,
      password: singinDto.password,
    });
    if (
      r === 'email, password is required' ||
      r === 'user not found' ||
      r === 'incorrect password'
    ) {
      throw new HttpException(r, HttpStatus.BAD_REQUEST);
    } else {
      return r;
    }
  }
}
