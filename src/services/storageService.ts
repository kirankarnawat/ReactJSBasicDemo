import Cookies from 'js-cookie'

import AppConsts from './../lib/appconst';

import { GetCurrentLoginInformations } from './session/dto/getCurrentLoginInformations';

class StorageService {

    //Token actions
    public async setToken(value: any, expireDate: any) {
        Cookies.set(AppConsts.tokenCookieName, JSON.stringify(value), { expires: expireDate } );
    }

    public async getToken() {
        const userJson = Cookies.get(AppConsts.tokenCookieName);
        let result = userJson !== undefined ? JSON.parse(userJson) : userJson;
        return result;
    }

    public async clearToken() {
        Cookies.remove(AppConsts.tokenCookieName);
    }
    //-------------------

    //Loged User Action
    public async setUserCookie(value: any) {
        Cookies.set(AppConsts.userCookieName, JSON.stringify(value), { expires: new Date(new Date().getTime() + AppConsts.usercookieExpDays * 86400000) });
    }

    public getUserCookie(): GetCurrentLoginInformations {
        const userJson = Cookies.get(AppConsts.userCookieName);
        let result = userJson !== undefined ? JSON.parse(userJson) : userJson;
        return result;
    }

    public async removeUserCookie() {
        Cookies.remove(AppConsts.userCookieName);
    }
    //-------------------
}

export default new StorageService;