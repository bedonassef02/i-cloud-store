import { Injectable } from '@nestjs/common';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SubCategory } from './entities/sub-category.entity';
import { Model } from 'mongoose';

@Injectable()
export class SubCategoriesService {
  constructor(
    @InjectModel(SubCategory.name) private subCategoryModel: Model<SubCategory>,
  ) {}

  async create(
    createSubCategoryDto: CreateSubCategoryDto,
  ): Promise<SubCategory> {
    const createdSubCategory = new this.subCategoryModel(createSubCategoryDto);
    return createdSubCategory.save();
  }

  async findAll(): Promise<SubCategory[]> {
    return this.subCategoryModel.find();
  }

  findOne(id: string): Promise<SubCategory> {
    return this.subCategoryModel.findById(id);
  }

  async update(
    id: string,
    updateSubCategoryDto: UpdateSubCategoryDto,
  ): Promise<SubCategory> {
    return this.subCategoryModel
      .findByIdAndUpdate(id, updateSubCategoryDto, { new: true })
      .exec();
  }

  remove(id: string): Promise<SubCategory> {
    return this.subCategoryModel.findByIdAndDelete(id).exec();
  }
}
