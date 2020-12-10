import jwt from 'jwt-simple';
import { User } from '../modules/UserModel';

class Token{

    private secret: string = "CLAVE_CURSO";
    public async createToken(user:User):Promise<String>{
        return jwt.encode(user, this.secret);
    }
}

export const token = new Token();