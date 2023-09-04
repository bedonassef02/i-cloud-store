import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AdminProductsController } from './admin-products.controller';
import { ProductsModule } from '../products/products.module';
import { AuthMiddleware } from '../common/middlewares/auth.middleware';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [ProductsModule, AuthModule],
  controllers: [AdminProductsController],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AuthMiddleware).forRoutes(AdminProductsController);
  }
}
