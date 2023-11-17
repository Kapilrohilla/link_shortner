import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createShortIdDto } from './dto/shortId.dto';
import { Response } from 'express';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Link')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOkResponse({
    description: 'The Api is working fine!',
    isArray: true,
  })
  @Get('/ping')
  getHello(): string {
    return this.appService.pong();
  }
  @ApiOkResponse({
    description: 'Give maximum 20 records from database',
    isArray: true,
  })
  @Get()
  getAll() {
    return this.appService.getAllUrl();
  }
  @ApiOkResponse({
    description: 'Redirect to original url',
    isArray: false,
  })
  @ApiResponse({
    status: 302,
    description: 'redirect successful',
  })
  @ApiBadRequestResponse({
    description: 'invalid Id as paramter',
  })
  @ApiForbiddenResponse({
    description: 'Api usage Limit exceeds, (LIMIT = 5)',
  })
  @ApiParam({ name: 'id', required: true })
  @Get(':id')
  async redirect(@Param('id') id, @Res() res: Response) {
    const originalUrl = await this.appService.redirectToOriginal(id);
    if (originalUrl === null) {
      throw new HttpException('invalid Parameter', HttpStatus.BAD_REQUEST);
    } else if (originalUrl === 'limit exceed') {
      throw new HttpException('Limit Exceeds', HttpStatus.FORBIDDEN);
    }
    return res.redirect(originalUrl);
  }

  @ApiCreatedResponse({
    description: 'Record created successfully',
  })
  @ApiBadRequestResponse({
    description: 'Invalid URL in body requestBody',
  })
  @Post()
  async createShortUrl(@Body() createShortIdDto: createShortIdDto) {
    const response = await this.appService.createShortUrl(createShortIdDto);
    if (response === 'invalid') {
      throw new HttpException('inalid URL', HttpStatus.BAD_REQUEST);
    }
  }
  @ApiOkResponse({
    description: 'Delete operation successful!',
    isArray: false,
  })
  @ApiBadRequestResponse({
    description: 'Invalid Id',
  })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  async deleteShortUrl(@Param('id') id) {
    const isDeleted = await this.appService.deleteShortUrl(id);
    if (isDeleted === null) {
      throw new HttpException('invalid Id', HttpStatus.BAD_REQUEST);
    } else {
      return isDeleted;
    }
  }
}
