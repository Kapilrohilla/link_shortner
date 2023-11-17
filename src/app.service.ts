import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { url } from './interface/url.interface';
import { nanoid } from 'nanoid';
import { createShortIdDto } from './dto/shortId.dto';

@Injectable()
export class AppService {
  constructor(@InjectModel('shorturl') private shortUrlModel: Model<url>) {}

  pong(): string {
    return 'Pong!';
  }

  async getAllUrl() {
    const limit = 20;
    return await this.shortUrlModel.find().limit(limit);
  }

  async redirectToOriginal(shortId: string): Promise<string> {
    const urlDetails = await this.shortUrlModel.findOne({ shortId });
    if (urlDetails === null) {
      return null;
    }
    if (urlDetails.count === 5) {
      return 'limit exceed';
    }
    await this.shortUrlModel.findByIdAndUpdate(urlDetails._id, {
      $inc: { count: 1 },
    });

    return urlDetails.originalUrl;
  }

  async createShortUrl(urlDetails: createShortIdDto): Promise<url | 'invalid'> {
    const urlRegex =
      /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

    const isValid = urlRegex.test(urlDetails.originalUrl);
    if (!isValid) {
      return 'invalid';
    }
    const shortId = nanoid(6);
    const toSave = new this.shortUrlModel({
      shortId,
      originalUrl: urlDetails.originalUrl,
    });
    const response = await toSave.save();
    return response;
  }

  async deleteShortUrl(id: string) {
    const isDeleted: null | url =
      await this.shortUrlModel.findByIdAndDelete(id);

    if (isDeleted === null) {
      throw new HttpException('invalid Id', HttpStatus.BAD_REQUEST);
    } else {
      return isDeleted;
    }
  }
}
