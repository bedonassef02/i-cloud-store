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
import {FilesInterceptor} from "@nestjs/platform-express";
import {UploadImagesInterceptor} from "./interceptors/upload-images.interceptor";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {
    }

    // @Post()
    // @UseInterceptors(AnyFilesInterceptor)
    // create(@UploadedFiles() files: Array<Express.Multer.File>,
    //        @Body() createProductDto: CreateProductDto,
    //        @Body('subcategory', IsSubCategoryExistPipe) subcategory: string): Promise<Product> {
    //     return this.productsService.create(createProductDto);
    // }

    @Post()
    @UseInterceptors(FilesInterceptor('files', 10, {dest: './uploads'}))
    uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
        console.log(files);
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
