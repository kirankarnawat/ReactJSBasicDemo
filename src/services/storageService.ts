import Cookies from 'js-cookie'
import * as CryptoJS from "crypto-js";

import AppConsts from './../lib/appconst';

import { GetCurrentLoginInformations } from './session/dto/getCurrentLoginInformations';

class StorageService {

    //Token actions
    public async setToken(value: any, expireDate: any) {
        var enckey = CryptoJS.AES.encrypt(JSON.stringify(value), AppConsts.encdecSecretKey);
        Cookies.set(AppConsts.tokenCookieName, enckey, { expires: expireDate } );
    }

    public getToken(): string {
        const userJson = Cookies.get(AppConsts.tokenCookieName);
        var bytes = userJson !== undefined ? CryptoJS.AES.decrypt(userJson.toString(), AppConsts.encdecSecretKey) : userJson;
        var result = bytes !== undefined ? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) : bytes;
        return result;
    }

    public async clearToken() {
        Cookies.remove(AppConsts.tokenCookieName);
    }
    //-------------------

    //Loged User Action
    public async setUserCookie(value: any) {
        var enckey = CryptoJS.AES.encrypt(JSON.stringify(value), AppConsts.encdecSecretKey);
        Cookies.set(AppConsts.userCookieName, enckey, { expires: new Date(new Date().getTime() + AppConsts.usercookieExpDays * 86400000) });
    }

    public getUserCookie(): GetCurrentLoginInformations {
        const userJson = Cookies.get(AppConsts.userCookieName);
        var bytes = userJson !== undefined ? CryptoJS.AES.decrypt(userJson.toString(), AppConsts.encdecSecretKey) : userJson;
        var result = bytes !== undefined ? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) : bytes;

        return result;
    }

    public async removeUserCookie() {
        Cookies.remove(AppConsts.userCookieName);
    }
    //-------------------
}

export default new StorageService;