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
    Query, UseInterceptors, UploadedFiles,
} from '@nestjs/common';
import {ProductsService} from './products.service';
import {UpdateProductDto} from './dto/update-product.dto';
import {Product} from "./entities/product.entity";
import {ParseMongoIdPipe} from "../common/pipes/parse-mongo-id.pipe";
import {QueryFeature} from "../common/features/query.feature";
import {IsProductExistPipe} from "./pipes/is-product-exist.pipe";
import {CreateProductDto} from "./dto/create-product.dto";
import {IsSubCategoryExistPipe} from "../sub-categories/pipes/is-sub-category-exist.pipe";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {
    }

    @Post()
    create(@Body() createProductDto: CreateProductDto,
           @Body('subcategory', IsSubCategoryExistPipe) subcategory: string):
        Promise<Product> {
        return this.productsService.create(createProductDto);
    }


    @Get()
    async findAll(@Query() query: QueryFeature): Promise<Product[]> {
        console.log(query);
        return this.productsService.findAll();
    }

    @Get(':id')
    @UsePipes(ParseMongoIdPipe)
    async findOne(@Param('id') id: string): Promise<Product> {
        return this.productsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseMongoIdPipe) id: string, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
        return this.productsService.update(id, updateProductDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UsePipes(ParseMongoIdPipe, IsProductExistPipe)
    async remove(@Param('id') id: string): Promise<void> {
        await this.productsService.remove(id);
    }
}
