import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { UserAdress } from 'src/user-address/models/user-address.model';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  name: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({
    type: String,
    unique: true,
  })
  email: string;

  @Prop()
  password: string;

  @Prop({
    default: 'user',
  })
  role: string;
  @Prop({
    type: Types.ObjectId,
    ref: "UserAdress"
  })
  userAdress: Types.ObjectId;
  @Prop({
    type: [{ type: String }],
    default: [],
  })
  refreshTokens: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
