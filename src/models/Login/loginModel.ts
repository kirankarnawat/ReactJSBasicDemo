import { observable } from 'mobx';

class LoginModel {
    emailAddress!: string;
    password!: string;
    @observable rememberMe!: boolean;

    toggleRememberMe = () => {
        this.rememberMe = !this.rememberMe;
    };
}

export default LoginModel;
