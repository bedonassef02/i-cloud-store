import {QueryFeature} from '../../common/features/query.feature';
import {Expose, Transform, Type} from 'class-transformer';
import {PartialType} from '@nestjs/mapped-types';
import {
    IsOptional,
    IsMongoId,
    IsInt,
    Min,
    Max,
    IsString,
    IsIn,
} from 'class-validator';
import {ObjectId} from 'mongoose';
import {BadRequestException} from '@nestjs/common';
import {PRODUCT_PAYMENT, PRODUCT_STATUS, PRODUCT_TYPE} from "../constants/constants";

export class ProductsFeature extends PartialType(QueryFeature) {
    @Expose({name: 'searchQuery'})
    get searchQuery(): any {
        return [
            {name: {$regex: this.search, $options: 'i'}},
            {description: {$regex: this.search, $options: 'i'}},
            {location: {$regex: this.search, $options: 'i'}},
        ];
    }

    @IsOptional()
    @Transform(({value}) => {
        if (typeof value === 'string') {
            return value.split(',').map((subcategory) => subcategory.trim());
        }
        return value;
    })
    @IsMongoId({each: true}) // Use IsMongoId decorator with "each" option
    subcategories: ObjectId[];

    @Expose()
    get skip(): number {
        return (this.page - 1) * this.limit;
    }

    @Type(() => Number)
    @IsInt()
    @Min(0)
    @IsOptional()
    minPrice = 0;

    @Type(() => Number)
    @IsInt()
    @IsOptional()
    @Max(1000000)
    maxPrice = 1000000;

    @Expose()
    get price(): number {
        if (this.minPrice > this.maxPrice) {
            throw new BadRequestException('Max price must be greater than min price');
        }
        return 0;
    }

    @IsOptional()
    @IsString()
    @IsIn(Object.values(PRODUCT_PAYMENT))
    payment = 'both';

    @IsOptional()
    @IsString()
    @IsIn([...Object.values(PRODUCT_STATUS), ''])
    status = '';

    @IsOptional()
    @IsString()
    @IsIn([...Object.values(PRODUCT_TYPE), ''])
    type = '';
}
