import { action, observable } from 'mobx';
import LoginModel from '../models/Login/loginModel';
import tokenAuthService from '../services/tokenAuth/tokenAuthService';

import { GetCurrentLoginInformations } from '../services/session/dto/getCurrentLoginInformations';
import UserLoginInfoDto from '../services/session/dto/userLoginInfoDto';

import Cookies from 'js-cookie'

export const getAccessToken = () => Cookies.get('access_token')

class AuthenticationStore {
    @observable loginModel: LoginModel = new LoginModel();

    get isAuthenticated(): boolean
    {
        let data = Cookies.get('access_token')
        if (!data) return false;
        return true;
    }

    @action
    public async login(model: LoginModel) {

        let result = await tokenAuthService.authenticate({
            emailAddress: model.emailAddress,
            password: model.password
            //rememberClient: model.rememberMe,
        });
        
        var info = new GetCurrentLoginInformations();
        var user = new UserLoginInfoDto();
        user.userId = result.userId;
        user.firstName = result.firstName;
        user.lastName = result.lastName;
        user.emailAddress = result.emailAddress;
        info.user = user;
        info.features = result.userFeatures;
        sessionStorage.setItem('loginuser', JSON.stringify(info));

        result.expireInSeconds = 3600;

        var tokenExpireDate = model.rememberMe ? new Date(new Date().getTime() + 1000 * result.expireInSeconds) : undefined;

        Cookies.set('access_token', result.token, { expires: tokenExpireDate })
    }

    @action
    logout() {
        localStorage.clear();
        sessionStorage.clear();
        Cookies.remove('access_token');
        // abp.auth.clearToken();
    }
}
export default AuthenticationStore;
