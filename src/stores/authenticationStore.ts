import { action, observable } from 'mobx';

import LoginModel from '../models/Login/loginModel';

import tokenAuthService from '../services/tokenAuth/tokenAuthService';

import { GetCurrentLoginInformations } from '../services/session/dto/getCurrentLoginInformations';
import UserLoginInfoDto from '../services/session/dto/userLoginInfoDto';

import storageService from '../services/storageService';

export const getAccessToken = () => storageService.getToken(); 

class AuthenticationStore {

    @observable loginModel: LoginModel = new LoginModel();

    get isAuthenticated(): boolean
    {
        let data = storageService.getUserCookie(); 
        if (!data) return false;
        return true;
    }

    @action
    public async login(model: LoginModel) {
        
        let result = await tokenAuthService.authenticate({
            emailAddress: model.emailAddress,
            password: model.password,
            salt: ''
        });
        
        var info = new GetCurrentLoginInformations();
        var user = new UserLoginInfoDto();
        user.userId = result.userId;
        user.firstName = result.firstName;
        user.lastName = result.lastName;
        user.emailAddress = result.emailAddress;
        info.user = user;
        info.features = result.userFeatures;

        // save user information in cookie
        storageService.setUserCookie(info);

        result.expireInSeconds = 3600;

        var tokenExpireDate = model.rememberMe ? new Date(new Date().getTime() + 1000 * result.expireInSeconds) : undefined;
        
        storageService.setToken(result.token, tokenExpireDate);
    }


    @action
    logout() {
        
        storageService.removeUserCookie();

        storageService.clearToken();
    }
}
export default AuthenticationStore;
