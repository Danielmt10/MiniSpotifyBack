import {Request, Response} from 'express';

class ArtistController{

    public index(req:Request, res:Response){
        res.status(200).send({
            message: 'Accediendo a Artistas'
        });
    }

}

export const artistController = new ArtistController();