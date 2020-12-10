import {Schema, Document, model} from 'mongoose';

export interface Album extends Document{
    tittle: string,
    description: string,
    year: number,
    image: string
    artist: Schema.Types.ObjectId,
}

const albumSchema:Schema = new Schema({
    tittle: String,
    description: String,
    year: Number,
    image: String, 
    artist: {type: Schema.Types.ObjectId, ref: 'Artist'}
});

export default model<Album>('Album', albumSchema);