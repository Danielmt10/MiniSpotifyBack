import {Schema, Document, model} from 'mongoose';

export interface User extends Document{
    name: string,
    surname: string,
    email: string,
    password: string,
    role: string,
    image: string,
    token: string
}

const userSchema:Schema = new Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    role: String,
    image: String
});

export default model<User>('User', userSchema);