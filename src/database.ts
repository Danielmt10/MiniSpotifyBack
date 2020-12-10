import mongoose from 'mongoose';

import {mongodb} from './keys';

mongoose.connect(mongodb.URI,{
    useNewUrlParser: true
})
    .then(db=> console.log('Database is connected'))
    .catch(err=>console.log(err));
