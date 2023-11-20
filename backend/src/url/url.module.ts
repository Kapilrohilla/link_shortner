import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { UrlServices } from './url.service';
import { MongooseModule } from '@nestjs/mongoose';
import { urlSchema } from '../Schema/url.schema';

@Module({
  controllers: [UrlController],
  providers: [UrlServices],
  imports: [MongooseModule.forFeature([{ name: 'urls', schema: urlSchema }])],
})
export class UrlModule {}
