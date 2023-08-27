import {forwardRef, Module} from '@nestjs/common';
import {CategoriesService} from './categories.service';
import {CategoriesController} from './categories.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Category, CategorySchema} from "./entities/category.entity";
import {IsCategoryExistPipe} from "./pipes/is-category-exist.pipe";
import {SubCategoriesModule} from "../sub-categories/sub-categories.module";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Category.name, schema: CategorySchema}]),
        forwardRef(() => SubCategoriesModule)
    ],
    controllers: [CategoriesController],
    providers: [
        CategoriesService,
        IsCategoryExistPipe,
    ],
    exports: [
        CategoriesService,
        IsCategoryExistPipe,
    ],
})
export class CategoriesModule {
}