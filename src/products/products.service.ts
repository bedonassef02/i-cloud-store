import {Injectable} from '@nestjs/common';
import {CreateProductDto} from './dto/create-product.dto';
import {UpdateProductDto} from './dto/update-product.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Product} from "./entities/product.entity";
import {Model} from "mongoose";
import slugify from "slugify";

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {
    }

    create(createProductDto: CreateProductDto) {
        const createdProduct = new this.productModel(createProductDto);
        createdProduct.slug = createdProduct._id + '-' + createProductDto['slug'];
        return createdProduct.save();
    }

    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    async findOne(id: string): Promise<Product> {
        return this.productModel.findById(id).exec();
    }

    update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
        updateProductDto['slug'] = updateProductDto.name ? id + '-' + slugify(updateProductDto.name, {lower: true}) : null;

        if (!updateProductDto['slug']) {
            delete updateProductDto['slug'];
        }

        return this.productModel.findByIdAndUpdate(id, updateProductDto, {new: true}).exec();
    }


    async remove(id: string): Promise<void> {
        await this.productModel.findByIdAndDelete(id).exec();
    }
}
