import { AuthenticationModel } from './dto/authenticationModel';
import { AuthenticationResultModel } from './dto/authenticationResultModel';
import http from '../httpService';

var md5 = require('md5');

declare var lms: any;

class TokenAuthService {
    public async authenticate(authenticationInput: AuthenticationModel): Promise<AuthenticationResultModel> {

        let strSalt = await http.get(lms.toAPIPath(lms.APIType.USERSALT));
        authenticationInput.salt = strSalt.data;
       
        //hash password
        var password = authenticationInput.password;
        var salt = authenticationInput.salt;
        var hash = md5(password);
        var hashedPwd = md5(salt + hash);
        authenticationInput.password = hashedPwd;

        let result = await http.post(lms.toAPIPath(lms.APIType.USERLOGIN), authenticationInput);
        return result.data;
    }
}

export default new TokenAuthService();
