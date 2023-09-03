import {Injectable} from '@nestjs/common';
import {CreateProductDto} from './dto/create-product.dto';
import {UpdateProductDto} from './dto/update-product.dto';
import {InjectModel} from '@nestjs/mongoose';
import {Product} from './entities/product.entity';
import {Model} from 'mongoose';
import slugify from 'slugify';
import {ProductsFeature} from './dto/products.feature';
import {PaginationInfo} from "../common/types/pagination.info";
import {ProductsResponse} from "./types/products-response";

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name) private readonly productModel: Model<Product>,
    ) {
    }

    create(createProductDto: CreateProductDto) {
        const createdProduct = new this.productModel(createProductDto);
        createdProduct.slug = createdProduct._id + '-' + createProductDto['slug'];
        return createdProduct.save();
    }

    async findAll(query: ProductsFeature): Promise<ProductsResponse> {
        const subcategory = query.subcategories
            ? { subcategory: { $in: query.subcategories } }
            : {};

        const totalProductsCount = await this.productModel.countDocuments({
            $and: [
                { $or: query.searchQuery },
                subcategory,
                { price: { $gte: query.minPrice, $lte: query.maxPrice } },
            ],
        });

        const products = await this.productModel
            .find({
                $and: [
                    { $or: query.searchQuery },
                    subcategory,
                    { price: { $gte: query.minPrice, $lte: query.maxPrice } },
                ],
            })
            .select(query.fields)
            .skip(query.skip)
            .limit(query.limit)
            .sort(query.sort)
            .exec();

        return {
            products,
            info: this.paginationInfo(query, totalProductsCount),
        };
    }
    async findOne(id: string): Promise<Product> {
        return this.productModel.findById(id).exec();
    }

    private paginationInfo(query: ProductsFeature, count: number): PaginationInfo {
        const endIndex = query.limit * query.page;
        const pagesCount = Math.ceil(count / query.limit);
        const nextPage = query.page < pagesCount ? query.page + 1 : null;
        const prevPage = query.page > 1 ? query.page - 1 : null;

        const info: PaginationInfo = {
            currentPage: query.page,
            endIndex,
            limit: query.limit,
            pagesCount,
            nextPage: nextPage as number,
            prevPage: prevPage as number,
        };

        return info;
    }


    update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
        updateProductDto['slug'] = updateProductDto.name
            ? id + '-' + slugify(updateProductDto.name, {lower: true})
            : null;

        if (!updateProductDto['slug']) {
            delete updateProductDto['slug'];
        }

        return this.productModel
            .findByIdAndUpdate(id, updateProductDto, {new: true})
            .exec();
    }

    async remove(id: string): Promise<void> {
        await this.productModel.findByIdAndDelete(id).exec();
    }
}
