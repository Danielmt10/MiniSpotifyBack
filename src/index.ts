import express from 'express';
import router from './routes/index'
import userRouter from './routes/UserRoute';
import artistRouter from './routes/ArtistRoute'
import morgan from 'morgan'
import './database';

//Initializations
const app = express();

//Settings
app.set('port', 3000 || process.env.PORT);

//Midellware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/", router);
app.use("/user", userRouter);
app.use("/artist", artistRouter)

//Starting the server
app.listen(app.get('port'),()=>{
    console.log(`Server listening on port ${app.get('port')}`);    
});

