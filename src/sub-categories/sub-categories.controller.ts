import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { SubCategoriesService } from './sub-categories.service';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id.pipe';
import { IsCategoryExistPipe } from '../categories/pipes/is-category-exist.pipe';
import { SubCategory } from './entities/sub-category.entity';
import { IsSubCategoryExistPipe } from './pipes/is-sub-category-exist.pipe';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('sub-categories')
export class SubCategoriesController {
  constructor(private readonly subCategoriesService: SubCategoriesService) {}

  @Post()
  @Roles('admin')
  async create(
    @Body() createSubCategoryDto: CreateSubCategoryDto,
    @Body('category', IsCategoryExistPipe) category: string,
  ): Promise<SubCategory> {
    return this.subCategoriesService.create(createSubCategoryDto);
  }

  @Get()
  async findAll(): Promise<SubCategory[]> {
    return this.subCategoriesService.findAll();
  }

  @Get(':id')
  @UsePipes(ParseMongoIdPipe, IsSubCategoryExistPipe)
  findOne(@Param('id') id: string): Promise<SubCategory> {
    return this.subCategoriesService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin')
  update(
    @Param('id', ParseMongoIdPipe, IsSubCategoryExistPipe) id: string,
    @Body() updateSubCategoryDto: UpdateSubCategoryDto,
    @Body('category', IsCategoryExistPipe) category: string,
  ): Promise<SubCategory> {
    return this.subCategoriesService.update(id, updateSubCategoryDto);
  }

  @Delete(':id')
  @Roles('admin')
  @UsePipes(ParseMongoIdPipe, IsSubCategoryExistPipe)
  remove(@Param('id') id: string): Promise<SubCategory> {
    return this.subCategoriesService.remove(id);
  }
}
