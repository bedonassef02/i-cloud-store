import {HydratedDocument} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {SubCategory} from "../../sub-categories/entities/sub-category.entity";
import * as mongoose from "mongoose";

export type ProductDocument = HydratedDocument<Product>;

@Schema({timestamps: true})
export class Product {
    @Prop({required: true})
    name: string;

    @Prop({unique: true})
    slug: string;

    @Prop({
        enum: ['sell', 'buy'],
        default: 'sell'
    })
    type: string;

    @Prop()
    price: number;

    @Prop()
    location: string;

    @Prop({
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory'}]
    })
    subcategory: SubCategory;

    @Prop({
        enum: ['new', 'used'],
        default: 'new'
    })
    status: string;

    @Prop()
    description: string;

    @Prop({
        enum: ['cash', 'installment', 'both'],
        default: 'cash'
    })
    payment: string;

    @Prop()
    images: [string];

    @Prop({default: false})
    accepted: boolean;

}

export const ProductSchema = SchemaFactory.createForClass(Product);