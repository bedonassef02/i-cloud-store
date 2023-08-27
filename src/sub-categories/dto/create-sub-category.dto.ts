import {IsMongoId, IsNotEmpty, IsString, Length} from "class-validator";

export class CreateSubCategoryDto {
    @IsNotEmpty()
    @IsString()
    @Length(2.50)
    name: string;

    @IsNotEmpty()
    @IsMongoId()
    category: string;
}
