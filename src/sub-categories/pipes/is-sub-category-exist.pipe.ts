import {ArgumentMetadata, Injectable, NotFoundException, PipeTransform} from '@nestjs/common';
import {SubCategoriesService} from "../sub-categories.service";

@Injectable()
export class IsSubCategoryExistPipe implements PipeTransform {
    constructor(private readonly subCategoriesService: SubCategoriesService) {
    }

    async transform(id: string, metadata: ArgumentMetadata): Promise<string> {
        const isSubCategoryExist = await this.subCategoriesService.findOne(id);
        if (!isSubCategoryExist) throw new NotFoundException(`Subcategory with ID ${id} not found`);
        return id;
    }
}
