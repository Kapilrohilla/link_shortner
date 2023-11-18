import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  working() {
    return 'Pong, Working Fine';
  }
}
