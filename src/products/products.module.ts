import {forwardRef, Module} from '@nestjs/common';
import {ProductsService} from './products.service';
import {ProductsController} from './products.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Product, ProductSchema} from "./entities/product.entity";
import {SubCategoriesModule} from "../sub-categories/sub-categories.module";

@Module({
    imports: [MongooseModule.forFeature([{
        name: Product.name,
        schema: ProductSchema
    }]), forwardRef(() => SubCategoriesModule)],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule {
}
