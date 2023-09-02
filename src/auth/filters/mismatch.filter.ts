import {ArgumentsHost, Catch, ExceptionFilter, HttpException} from '@nestjs/common';
import {Response} from "express";

@Catch(HttpException)
export class MismatchFilter<T extends HttpException> implements ExceptionFilter {
    catch(exception: T, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const status = exception.getStatus();

        if (status === 409) {
            response.status(status).json({
                message: 'email or password mismatch our records',
                error: 'Bad Request',
                statusCode: status
            })
        }else{
            response.status(status).json(exception.getResponse());
        }
    }
}
