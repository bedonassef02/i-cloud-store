import {forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {CategoriesService} from './categories.service';
import {CategoriesController} from './categories.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {Category, CategorySchema} from './entities/category.entity';
import {IsCategoryExistPipe} from './pipes/is-category-exist.pipe';
import {SubCategoriesModule} from '../sub-categories/sub-categories.module';
import {AuthMiddleware} from "../common/middlewares/auth.middleware";
import {AuthModule} from "../auth/auth.module";
import {APP_GUARD} from "@nestjs/core";
import {AuthGuard} from "../common/guards/auth.guard";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Category.name, schema: CategorySchema},
        ]),
        forwardRef(() => SubCategoriesModule),
        AuthModule
    ],
    controllers: [CategoriesController],
    providers: [CategoriesService, IsCategoryExistPipe],
    exports: [CategoriesService, IsCategoryExistPipe],
})
export class CategoriesModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(AuthMiddleware)
            .exclude({
                method: RequestMethod.GET,
                path: '/categories',
            }, {
                method: RequestMethod.GET,
                path: '/categories/:id'
            })
            .forRoutes(CategoriesController);
    }

}
