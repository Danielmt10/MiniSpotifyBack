import {Schema, Document, model} from 'mongoose';

export interface Artist extends Document{
    name: string,
    description: string,
    image: string
}

const artistSchema:Schema = new Schema({
    name: String,
    description: String,
    image: String
});

export default model<Artist>('Artist', artistSchema);