import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { newUserDto } from 'src/dto/newUser.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({
    description: 'Give maximum 20 records from database',
    isArray: true,
  })
  @Get()
  getAllUser() {
    return this.userService.fetchAllUser();
  }

  @ApiOkResponse({
    description: 'Give maximum 20 records from database',
    isArray: true,
  })
  @ApiBadRequestResponse({
    description: 'invalid id (parameter)',
  })
  @ApiNotFoundResponse({
    description: 'user not found with given id',
  })
  @ApiParam({ name: 'id', required: true })
  @Get(':id')
  async getSpecificUser(@Param('id') id) {
    const user = await this.userService.getSpecificUser(id);
    if (user === null) {
      throw new HttpException('User Not found', HttpStatus.NOT_FOUND);
    } else if (user === 'invalid id') {
      throw new HttpException(user, HttpStatus.BAD_REQUEST);
    }
    return user;
  }
  @ApiCreatedResponse({
    description: 'user created successfully',
  })
  @ApiBadRequestResponse({
    description: 'invalid parameters in request body',
  })
  @Post()
  async createNewUser(@Body() userDetail: newUserDto) {
    const response = await this.userService.createUser(userDetail);
    if (response === 'first_name is required') {
      throw new HttpException(response, HttpStatus.BAD_REQUEST);
    } else if (response === 'Email not provided or incorrect') {
      throw new HttpException(response, HttpStatus.BAD_REQUEST);
    } else if (response === 'user already exists') {
      throw new HttpException(response, HttpStatus.BAD_REQUEST);
    } else if (response === 'something went wrong') {
      throw new HttpException(response, HttpStatus.INTERNAL_SERVER_ERROR);
    } else if (response === 'Password is required') {
      throw new HttpException(response, HttpStatus.BAD_REQUEST);
    }
    return response;
  }

  @ApiOkResponse({
    description: 'user deleted successfully!',
    isArray: false,
  })
  @ApiBadRequestResponse({
    description: 'Invalid Id | user not found',
  })
  @ApiParam({ name: 'id', required: true })
  @Delete(':id')
  async deleteUser(@Param('id') id) {
    const response = await this.userService.deleteUser(id);
    if (response === null) {
      throw new HttpException(
        'User not found to delete',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return response;
    }
  }

  // update user
}
