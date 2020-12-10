import {Schema, Document, model} from 'mongoose';

export interface Song extends Document{
    number: string,
    name: string,
    duration: string,
    file: string,
    album: Schema.Types.ObjectId

}

const songSchema:Schema = new Schema({
    number: String,
    name: String,
    duration: String,
    file: String,
    album: {type:Schema.Types.ObjectId, ref: 'Album'}
});

export default model<Song>('Song', songSchema);