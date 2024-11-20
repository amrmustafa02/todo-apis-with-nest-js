import { HttpException, HttpStatus } from '@nestjs/common';

export class GlobalErrorHandler {
  static catch(exception) {
    console.log(exception);

    if (exception instanceof HttpException) {
      throw exception;
    }

    throw new HttpException(
      'Something went wrong',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
