import { AuthenticationModel } from './dto/authenticationModel';
import { AuthenticationResultModel } from './dto/authenticationResultModel';
import http from '../httpService';

declare var lms: any;

class TokenAuthService {
    public async authenticate(authenticationInput: AuthenticationModel): Promise<AuthenticationResultModel> {
        //let result = await http.post('/api/user/login', authenticationInput);
        let result = await http.post(lms.utils.buildUriString('user','testlogin'), authenticationInput);
        return result.data;
    }
}

export default new TokenAuthService();
