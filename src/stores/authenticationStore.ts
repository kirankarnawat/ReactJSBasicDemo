import { action, observable } from 'mobx';
import LoginModel from '../models/Login/loginModel';
import tokenAuthService from '../services/tokenAuth/tokenAuthService';

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
            userNameOrEmailAddress: model.userNameOrEmailAddress,
            password: model.password,
            rememberClient: model.rememberMe,
        });

        sessionStorage.setItem('userid', result.userId.toString());

        var tokenExpireDate = model.rememberMe ? new Date(new Date().getTime() + 1000 * result.expireInSeconds) : undefined;

        Cookies.set('access_token', result.accessToken, { expires: tokenExpireDate })

        //  abp.auth.setToken(result.accessToken, tokenExpireDate);
        //  abp.utils.setCookieValue(AppConsts.authorization.encrptedAuthTokenName, result.encryptedAccessToken, tokenExpireDate, abp.appPath);
    }

    @action
    logout() {
        debugger;
        localStorage.clear();
        sessionStorage.clear();
        Cookies.remove('access_token');
        // abp.auth.clearToken();
    }
}
export default AuthenticationStore;
