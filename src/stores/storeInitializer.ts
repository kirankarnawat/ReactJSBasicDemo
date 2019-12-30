import UserStore from './userStore';
import SessionStore from './sessionStore';
import AuthenticationStore from './authenticationStore';
import ContentRepositoryStore from './contentrepositoryStore';
import GroupStore from './groupStore';

export default function initializeStores() {
    return {

        authenticationStore: new AuthenticationStore(),

        userStore: new UserStore(),

        sessionStore: new SessionStore(),

        contentrepositoryStore: new ContentRepositoryStore(),

        groupStore: new GroupStore(),
    };
}
