import jwt from 'jwt-simple';
import { User } from '../modules/UserModel';
import {secret} from '../keys';
import moment from 'moment';

class Token{

    public async createToken(user:User):Promise<String>{
        return jwt.encode({
            id: user._id,
            name: user.name,
            surname: user.surname,
            email: user.email, 
            role: user.role,
            image: user.image,
            iat: moment().unix(),
            exp: moment().add(10,"m").unix()
        }, secret);
    }
}

export const token = new Token();