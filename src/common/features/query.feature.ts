import { IsInt, IsOptional, IsString } from 'class-validator';
import { Expose, Transform, Type } from 'class-transformer';

export class QueryFeature {
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  public readonly page: number = 1;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  limit = 10;

  @IsOptional()
  @IsString()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.replace(/,/g, ' ') : value,
  )
  sort = '-createdAt';

  @IsOptional()
  @IsString()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.replace(/,/g, ' ') : value,
  )
  fields = '-__v';

  @IsOptional()
  @IsString()
  filter = '';

  @IsOptional()
  @IsString()
  search = '';

  @Expose({ name: 'skip' })
  get skip(): number {
    return (this.page - 1) * this.limit;
  }

  @Expose({ name: 'searchQuery' })
  get searchQuery(): any {
    return [{ name: { $regex: this.search, $options: 'i' } }];
  }
}
