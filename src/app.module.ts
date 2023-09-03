import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {CategoriesModule} from './categories/categories.module';
import {MongooseModule} from '@nestjs/mongoose';
import {APP_FILTER, APP_GUARD} from '@nestjs/core';
import {DuplicateKeyExceptionFilter} from './common/filters/dublicate-key-exception.filter';
import {SubCategoriesModule} from './sub-categories/sub-categories.module';
import {CommonModule} from './common/common.module';
import {ProductsModule} from './products/products.module';
import {ConfigModule} from '@nestjs/config';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {AuthGuard} from "./common/guards/auth.guard";

@Module({
    imports: [
        ConfigModule.forRoot({expandVariables: true}),
        MongooseModule.forRoot(process.env.DB_URI),
        CategoriesModule,
        SubCategoriesModule,
        CommonModule,
        ProductsModule,
        AuthModule,
        UsersModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_FILTER,
            useClass: DuplicateKeyExceptionFilter,
        },
        {
            provide: APP_GUARD,
            useClass: AuthGuard
        }
    ],
})
export class AppModule {
}
