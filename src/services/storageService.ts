import Cookies from 'js-cookie'
import * as CryptoJS from "crypto-js";

import AppConsts from './../lib/appconst';

import { GetCurrentLoginInformations } from './session/dto/getCurrentLoginInformations';

class StorageService {

    //Token actions
    public async setToken(value: any, expireDate: any) {
        var enckey = CryptoJS.AES.encrypt(JSON.stringify(value), AppConsts.encdecSecretKey);
        Cookies.set(AppConsts.tokenCookieName, enckey, { expires: expireDate });
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

        // features in session
        localStorage.setItem("features", JSON.stringify(value.features));

        //empty data from features for cache
        value.features = [];

        // userdata in cookie
        var enckey = CryptoJS.AES.encrypt(JSON.stringify(value), AppConsts.encdecSecretKey);
        Cookies.set(AppConsts.userCookieName, enckey, { expires: new Date(new Date().getTime() + AppConsts.usercookieExpDays * 86400000) });
    }

    public getUserCookie(): GetCurrentLoginInformations {

        //get user data from cookie
        const userJson = Cookies.get(AppConsts.userCookieName);
        var bytes = userJson !== undefined ? CryptoJS.AES.decrypt(userJson.toString(), AppConsts.encdecSecretKey) : userJson;
        var result = bytes !== undefined ? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) : bytes;

        //features from session
        if (result !== undefined) {

            var data = localStorage.getItem("features");
            result.features = (data !== null)? JSON.parse(data) : [];
        }

        return result;
    }

    public async removeUserCookie() {

        localStorage.removeItem("features");

        Cookies.remove(AppConsts.userCookieName);
    }
    //-------------------
}

export default new StorageService;