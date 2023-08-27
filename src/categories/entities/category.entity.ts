import {HydratedDocument} from 'mongoose';
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export type CategoryDocument = HydratedDocument<Category>;

@Schema({timestamps: true})
export class Category {
    @Prop({unique: true})
    name: string;
    @Prop({unique: true})
    slug: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);