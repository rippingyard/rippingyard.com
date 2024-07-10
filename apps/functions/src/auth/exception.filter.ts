import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { HttpException } from '@nestjs/common';

@Catch(HttpException)
export class AuthExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    if (HttpStatus.UNAUTHORIZED === status) {
      response.set(
        'WWW-Authenticate',
        'Basic realm="Please Enter Your Password"',
      );
    }

    response.status(status).json({
      statusCode: status,
    });
  }
}
