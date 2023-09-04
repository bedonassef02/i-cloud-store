import { Controller, Delete, Get, Param, Patch, Query } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { Roles } from '../common/decorators/roles.decorator';
import { ProductsFeature } from '../products/dto/products.feature';
import { ProductsResponse } from '../products/types/products-response';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id.pipe';
import { IsProductExistPipe } from '../products/pipes/is-product-exist.pipe';
import { Product } from '../products/entities/product.entity';

@Controller('admin/products')
export class AdminProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @Roles('admin')
  async findAll(@Query() query: ProductsFeature): Promise<ProductsResponse> {
    return this.productsService.findAll(query, false);
  }

  @Get(':id')
  @Roles('admin')
  async findOne(@Query() query: ProductsFeature): Promise<ProductsResponse> {
    return this.productsService.findAll(query, false);
  }

  @Patch(':id')
  @Roles('admin')
  async accept(
    @Param('id', ParseMongoIdPipe, IsProductExistPipe) id: string,
  ): Promise<Product> {
    return this.productsService.accept(id);
  }

  @Delete(':id')
  @Roles('admin')
  async remove(
    @Param('id', ParseMongoIdPipe, IsProductExistPipe) id: string,
  ): Promise<void> {
    await this.productsService.remove(id);
  }
}
