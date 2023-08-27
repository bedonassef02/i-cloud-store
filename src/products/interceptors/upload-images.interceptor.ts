import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from '@nestjs/common';
import {Observable, pipe} from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Injectable()
export class UploadImagesInterceptor implements NestInterceptor {
    private readonly allowedImageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const interceptor = FileInterceptor('files', {
            storage: diskStorage({
                destination: './uploads',
                filename: this.generateRandomFilename,
            }),
            fileFilter: this.imageFileFilter,
        });

        return next.handle();
    }

    private generateRandomFilename(req, file, callback): void {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        callback(null, `${randomName}${extname(file.originalname)}`);
    }

    private imageFileFilter(req, file, callback): void {
        const ext = extname(file.originalname).toLowerCase();
        if (!this.allowedImageExtensions.includes(ext)) {
            return callback(new BadRequestException('Only image files are allowed!'));
        }
        callback(null, true);
    }
}
