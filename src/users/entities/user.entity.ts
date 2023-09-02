import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({timestamps: true})
export class User {
    @Prop()
    username: string;
    @Prop({unique: true, lowercase: true})
    email: string;
    @Prop()
    password: string;
    @Prop({
        enum: ['super-admin', 'admin', 'editor', 'user'],
        default: 'user'
    })
    type: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
