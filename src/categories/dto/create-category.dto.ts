import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { Expose } from 'class-transformer';
import slugify from 'slugify';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  name: string;

  @IsOptional()
  @Expose({ name: 'slug' })
  getSlug() {
    return slugify(this.name, { lower: true });
  }
}
