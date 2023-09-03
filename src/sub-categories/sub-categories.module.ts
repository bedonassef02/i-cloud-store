import { forwardRef, Module } from '@nestjs/common';
import { SubCategoriesService } from './sub-categories.service';
import { SubCategoriesController } from './sub-categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SubCategory, SubCategorySchema } from './entities/sub-category.entity';
import { CategoriesModule } from '../categories/categories.module';
import { IsSubCategoryExistPipe } from './pipes/is-sub-category-exist.pipe';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SubCategory.name,
        schema: SubCategorySchema,
      },
    ]),
    forwardRef(() => CategoriesModule),
  ],
  controllers: [SubCategoriesController],
  providers: [SubCategoriesService, IsSubCategoryExistPipe],
  exports: [SubCategoriesService, IsSubCategoryExistPipe],
})
export class SubCategoriesModule {}
