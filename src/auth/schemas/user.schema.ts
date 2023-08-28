import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema({
    timestamps: true,
})
export class User extends Document {

    @Prop()
    image_url: string;

    @Prop()
    name: string
    
    @Prop({ unique: [ true, 'Duplicate email entered' ] })
    email: string
    
    @Prop()
    password: string

    @Prop({ default: 'user' }) // Por defecto, todos los usuarios serán 'user'
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User)