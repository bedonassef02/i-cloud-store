import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsIn,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { Expose } from 'class-transformer';
import slugify from 'slugify';
import {
  PRODUCT_PAYMENT,
  PRODUCT_STATUS,
  PRODUCT_TYPE,
} from '../constants/constants';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 200)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 1500)
  description: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(PRODUCT_TYPE))
  type: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 100)
  location: string;
  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(PRODUCT_PAYMENT))
  payment: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(PRODUCT_STATUS))
  status: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100000)
  price = 2000;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  images: string[];

  @IsNotEmpty()
  @IsMongoId()
  subcategory: string;

  @IsNotEmpty()
  @IsMongoId()
  user: string;

  @IsOptional()
  @Expose({ name: 'slug' })
  getSlug() {
    return slugify(this.name, { lower: true });
  }
}
