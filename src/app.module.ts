import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {CategoriesModule} from './categories/categories.module';
import {MongooseModule} from "@nestjs/mongoose";
import {APP_FILTER} from "@nestjs/core";
import {DuplicateKeyExceptionFilter} from "./common/filters/dublicate-key-exception.filter";
import {SubCategoriesModule} from './sub-categories/sub-categories.module';
import {CommonModule} from './common/common.module';
import {ProductsModule} from './products/products.module';
import {MulterModule} from "@nestjs/platform-express";
import {ConfigModule} from "@nestjs/config";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [ConfigModule.forRoot({expandVariables: true}),
        MongooseModule.forRoot(process.env.DB_URI), MulterModule.register({
            dest: './upload',
        }), CategoriesModule, SubCategoriesModule, CommonModule, ProductsModule, AuthModule, UsersModule],
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
