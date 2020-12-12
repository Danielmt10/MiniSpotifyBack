import jwt from 'jwt-simple';
import {secret} from '../keys';
import moment from 'moment';
import { Request, Response } from 'express';
import objectToken from '../services/servicesToken';

class Autenticated{

    public ensureAuth = (req: Request | any, res: Response, next: any )=>{
        if(!req.headers.authorization){
            res.status(403).send({
                message: "No hay cabecera de autenticacion"
            });
        }else{
            var token = req.headers.authorization.replace(/["']+/g, "");
            try{
                var payload = jwt.decode(token, secret);
                if(payload.exp <= moment().unix()){
                    res.status(403).send({
                        message: "El token ha expirado"
                    });
                }
                req.user = payload;
                next();
            }catch(err){
                res.status(403).send({
                    message: "Token no valido"
                });
            }           
        }
    }   
}

export const autenticated = new Autenticated();