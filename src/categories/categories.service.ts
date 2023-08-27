import {Injectable} from '@nestjs/common';
import {CreateCategoryDto} from './dto/create-category.dto';
import {UpdateCategoryDto} from './dto/update-category.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Category} from "./entities/category.entity";
import {Model} from "mongoose";
import {SubCategoriesService} from "../sub-categories/sub-categories.service";

@Injectable()
export class CategoriesService {
    constructor(@InjectModel(Category.name) private categoryModel: Model<Category>,
                private subCategoriesService: SubCategoriesService) {
    }

    async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const createdCategory = new this.categoryModel(createCategoryDto);
        return createdCategory.save();
    }

    async findAll(): Promise<Category[]> {
        return this.categoryModel.find().exec();
    }

    async findAllSubCategories(){
        await this.subCategoriesService.findAll();
    }

    async findOne(id: string): Promise<Category> {
        return this.categoryModel.findById(id).exec();
    }

    async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
        return this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, {new: true}).exec();
    }

    async remove(id: string): Promise<Category> {
        return this.categoryModel.findByIdAndDelete(id).exec();
    }
}
