import { action, observable, runInAction } from 'mobx';

import sessionService from '../services/session/sessionService';
import contentrepositoryService from '../services/contentrepository/contentrepositoryService';

class ContentRepositoryStore {

    @observable userid!: string;

    @action
    async initUserId() {

        runInAction(() => {
            this.userid = sessionService.getLoginUserId();
        });
    }

    @action
    async getContentRepositoryCount() {

        let result = await contentrepositoryService.getContentRepositoryCount(this.userid);
        return result;
    }

    
}

export default ContentRepositoryStore;
