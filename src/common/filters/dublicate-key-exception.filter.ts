import { Catch, ExceptionFilter, ArgumentsHost, Logger } from '@nestjs/common';
import { MongoServerError } from 'mongodb';

@Catch(MongoServerError)
export class DuplicateKeyExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(DuplicateKeyExceptionFilter.name);

  catch(exception: MongoServerError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception.code === 11000) {
      const statusCode = 409;
      const message =
        'This field is already in use. Duplicates are not allowed.';

      response.status(statusCode).json({
        statusCode,
        message,
      });
    } else {
      const statusCode = 500;
      const message = 'Internal server error';

      this.logger.error(
        `Internal Server Error: ${exception.message}`,
        exception.stack,
      );

      response.status(statusCode).json({
        statusCode,
        message,
      });
    }
  }
}
