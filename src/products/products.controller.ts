import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UsePipes,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id.pipe';
import { IsProductExistPipe } from './pipes/is-product-exist.pipe';
import { CreateProductDto } from './dto/create-product.dto';
import { IsSubCategoryExistPipe } from '../sub-categories/pipes/is-sub-category-exist.pipe';
import { Roles } from '../common/decorators/roles.decorator';
import { AuthGuard } from '../common/guards/auth.guard';
import { ProductsFeature } from './dto/products.feature';
import { ProductsResponse } from './types/products-response';
import { AddUserIdToBodyInterceptor } from './interceptors/add-user-id-to-body.interceptor';
import { IsSameUserGuard } from './guards/is-same-user.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadImagesInterceptor } from './interceptors/upload-images.interceptor';

@Controller('products')
@UseGuards(AuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Roles('user')
  @UseInterceptors(
    FilesInterceptor('images'),
    UploadImagesInterceptor,
    AddUserIdToBodyInterceptor,
  )
  create(
    @Body() createProductDto: CreateProductDto,
    @Body('subcategory', IsSubCategoryExistPipe) subcategory: string,
  ): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  async findAll(@Query() query: ProductsFeature): Promise<ProductsResponse> {
    // console.log(query);
    return this.productsService.findAll(query);
  }

  @Get('admin/pending')
  @Roles('admin')
  async findAllPending(
    @Query() query: ProductsFeature,
  ): Promise<ProductsResponse> {
    return this.productsService.findAll(query, false);
  }

  @Get(':id')
  @UsePipes(ParseMongoIdPipe)
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @Roles('user')
  @UseGuards(IsSameUserGuard)
  @UseInterceptors(AddUserIdToBodyInterceptor)
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @Roles('user')
  @UseGuards(IsSameUserGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @UsePipes(ParseMongoIdPipe, IsProductExistPipe)
  async remove(@Param('id') id: string): Promise<void> {
    await this.productsService.remove(id);
  }
}
