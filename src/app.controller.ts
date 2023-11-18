import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Root')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @ApiOkResponse({
    description: 'The Api is working fine!',
    isArray: true,
  })
  @Get('/ping')
  ping() {
    return this.appService.working();
  }
}
