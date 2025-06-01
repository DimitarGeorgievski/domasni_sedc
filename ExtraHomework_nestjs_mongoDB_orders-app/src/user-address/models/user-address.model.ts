import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { User } from "src/users/models/user.model";

export type UserAdressDocument = HydratedDocument<UserAdress>;

@Schema()
export class UserAdress{
    @Prop()
    name:string;
    @Prop()
    country:string;
    @Prop()
    city:string;
    @Prop()
    street:string;
    @Prop()
    zipCode:string;
    @Prop({
        type: Types.ObjectId
    })
    user: Types.ObjectId; // ovde treba samo ObjectId od user a ne cel objekt od user taka?
}

export const userAdressSchema = SchemaFactory.createForClass(UserAdress);