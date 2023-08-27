import {IsInt, IsOptional, IsString} from "class-validator";

export class QueryFeature {
    @IsOptional()
    @IsInt()
    page: number;
    @IsOptional()
    @IsInt()
    limit: number;

    @IsOptional()
    @IsString()
        // @Transform();
    sort: string;

    @IsOptional()
    @IsString()
    fields: string;

    @IsOptional()
    @IsString()
    filter: string;

    @IsOptional()
    @IsString()
    search: string;

}