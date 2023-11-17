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
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/ping')
  getHello(): string {
    return this.appService.pong();
  }

  @Get()
  getAll() {
    return this.appService.getAllUrl();
  }
  @Get(':id')
  async redirect(@Param('id') id, @Res() res: Response) {
    const originalUrl = await this.appService.redirectToOriginal(id);
    if (originalUrl === null) {
      throw new HttpException('invalid parameters', HttpStatus.BAD_REQUEST);
    } else if (originalUrl === 'limit exceed') {
      throw new HttpException('Limit Exceeds', HttpStatus.FORBIDDEN);
    }
    return res.redirect(originalUrl);
  }
  @Post()
  async createShortUrl(@Body() createShortIdDto: createShortIdDto) {
    const response = await this.appService.createShortUrl(createShortIdDto);
    if (response === 'invalid') {
      throw new HttpException('inalid Email', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteShortUrl(@Param('id') id) {
    return await this.appService.deleteShortUrl(id);
  }
}
