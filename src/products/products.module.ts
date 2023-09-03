import {
    forwardRef,
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common';
import {ProductsService} from './products.service';
import {ProductsController} from './products.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {Product, ProductSchema} from './entities/product.entity';
import {SubCategoriesModule} from '../sub-categories/sub-categories.module';
import {AuthMiddleware} from '../common/middlewares/auth.middleware';
import {AuthModule} from '../auth/auth.module';
import {MulterModule} from "@nestjs/platform-express";
import {diskStorage} from "multer";

@Module({
    imports: [
        MulterModule.register({
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    cb(null, Date.now() + file.originalname);
                },
            }),
        }),
        MongooseModule.forFeature([
            {
                name: Product.name,
                schema: ProductSchema,
            },
        ]),
        forwardRef(() => SubCategoriesModule),
        AuthModule,
    ],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer
            .apply(AuthMiddleware)
            .exclude(
                {
                    method: RequestMethod.GET,
                    path: '/products',
                },
                {
                    method: RequestMethod.GET,
                    path: '/products/:id',
                },
            )
            .forRoutes(ProductsController);
    }
}
