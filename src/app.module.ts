import {Module, ValidationPipe} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {CategoriesModule} from './categories/categories.module';
import {MongooseModule} from "@nestjs/mongoose";
import {APP_FILTER, APP_PIPE} from "@nestjs/core";
import {DuplicateKeyExceptionFilter} from "./common/filters/dublicate-key-exception.filter";
import {SubCategoriesModule} from './sub-categories/sub-categories.module';
import {CommonModule} from './common/common.module';
import {ProductsModule} from './products/products.module';
import {MulterModule} from "@nestjs/platform-express";

@Module({
    imports: [MongooseModule.forRoot('mongodb+srv://bedo:bedonassef71@cluster0.pyyzclc.mongodb.net/olx'), MulterModule.register({
        dest: './upload',
    }), CategoriesModule, SubCategoriesModule, CommonModule, ProductsModule],
    controllers: [AppController],
    providers: [AppService,
        {
            provide: APP_FILTER,
            useClass: DuplicateKeyExceptionFilter
        }
    ],
})
export class AppModule {
}
