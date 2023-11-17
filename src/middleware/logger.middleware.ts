import { NestMiddleware, Injectable } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const reqBody = JSON.stringify(req.body);
    res.on('finish', () => {
      const loggerString = `${req.method} ${req.url} ${res.statusCode} ${reqBody}`;
      console.log(loggerString);
    });
    next();
  }
}
