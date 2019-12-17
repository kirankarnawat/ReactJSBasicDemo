import UserStore from './userStore';
import SessionStore from './sessionStore';
import AuthenticationStore from './authenticationStore';

export default function initializeStores() {
    return {

        authenticationStore: new AuthenticationStore(),

        userStore: new UserStore(),

        sessionStore: new SessionStore(),
    };
}
