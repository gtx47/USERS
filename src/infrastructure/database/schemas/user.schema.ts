import {Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = UserMongo & Document;


@Schema ({ timestamps: true})
export class UserMongo {
    @Prop({ required: true})
    name!: string;
cod
    @Prop({required: true, unique: true})
    email!: string;

    @Prop({required: true})
    password!: string;

    @Prop({required: true, enum:['estudiante', 'docente', 'administrativo']})
    role!: string;

    @Prop({ default: true})
    isActive!: boolean;
}

export const  UserSchema =  SchemaFactory.createForClass(UserMongo);