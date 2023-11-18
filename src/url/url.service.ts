import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';
import { createShortIdDto } from 'src/dto/shortId.dto';
import { url } from 'src/interface/url.interface';

@Injectable()
export class UrlServices {
  constructor(@InjectModel('urls') private urlModel: Model<url>) {}

  working() {
    return 'working fine!';
  }

  async getAllUrl() {
    const limit = 20;
    return await this.urlModel.find().limit(limit);
  }

  async redirectToOriginal(shortId: string): Promise<string> {
    const urlDetails = await this.urlModel.findOne({ shortId });
    if (urlDetails === null) {
      return null;
    }
    if (urlDetails.count === 5) {
      return 'limit exceed';
    }
    await this.urlModel.findByIdAndUpdate(urlDetails._id, {
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
    const toSave = new this.urlModel({
      shortId,
      originalUrl: urlDetails.originalUrl,
    });
    return await toSave.save();
  }

  async deleteShortUrl(id: string) {
    try {
      const isDeleted: null | url = await this.urlModel.findByIdAndDelete(id);
      return isDeleted;
    } catch (err) {
      throw new HttpException('invalid Id', HttpStatus.BAD_REQUEST);
    }
  }
}
