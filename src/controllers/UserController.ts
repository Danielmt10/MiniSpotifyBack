import { Request, Response } from 'express';
import UserSchema, { User } from '../modules/UserModel'
import {token} from '../services/servicesToken';
import bcrypt from 'bcrypt'

class UserController {

    public async saveUser(req: Request, res: Response) {
        let { name, surname, email, password, } = req.body;
        const { role, image } = { role: "ROLE_USER", image: "null" };

        if ((name == "" || name == null) || (surname == "" || surname == null) || (email == "" || email == null) || (password == "" || password == null)) {
            res.status(200).send({
                message: 'Ingrese todos los campos'
            });
        } else {
            bcrypt.hash(password, 10, async (err, hash) => {
                if (err) {
                    console.log(err);
                    res.status(500);
                } else {
                    password = hash;
                    const user = new UserSchema({
                        name,
                        surname,
                        email,
                        password,
                        role,
                        image
                    });

                    await user.save();
                    res.status(200).send(user);
                }
            });
        }
    }


    public async loginUser(req: Request, res: Response) {
        let params: User = req.body;
        let email = params.email;
        let password = params.password;
        if (email != "" && email != null && email != undefined) {
            await UserSchema.findOne({ email: email.toLowerCase() }, (err, user:User) => {
                if (err) {
                    res.status(500).send({
                        message: 'Connection issue'
                    });
                } else {
                    if (!user) {
                        res.status(404).send("user not found");
                    } else {
                        if (password != "" && password != null && password != undefined) {
                            bcrypt.compare(password, user.password, async (err, check) => {
                                if (check) {
                                    await token.createToken(user).then(async (token)=>{
                                        user.token =  token.toString();
                                        await user.save();                                     
                                        res.status(200).send({
                                            id: user._id,
                                            user: user.name,
                                            username: user.surname,
                                            email: user.email,
                                            role: user.role,
                                            image: user.image,
                                            token: user.token,
                                            v: user.__v
                                        });
                                    });                                 
                                    
                                } else {
                                    res.status(200).send("Loggin not sucessfull");
                                }
                            });
                        } else {
                            res.status(200).send("Put a password");
                        }
                    }
                }
            })
        } else {
            res.status(404).send({
                message: 'Enter an email'
            });
        }
    }
}

export const userController = new UserController();