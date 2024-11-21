import { NestMiddleware } from '@nestjs/common';

export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: Error | any) => void) {
    console.log(req.method, req.url, req.body);
    console.log(req.headers.authorization);
    next();
  }
}
