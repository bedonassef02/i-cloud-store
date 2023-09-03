import {Injectable, NestInterceptor, ExecutionContext, CallHandler} from '@nestjs/common';
import {Observable} from 'rxjs';

@Injectable()
export class UploadImagesInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        const request = context.switchToHttp().getRequest();

        const files = request.files;

        if(files) {
            const images = files.map(file => {
                return file.filename;
            })

            request.body.images = images;
        }
        return next.handle();
    }
}
