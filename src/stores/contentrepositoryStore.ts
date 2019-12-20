import { action, observable, runInAction } from 'mobx';

import sessionService from '../services/session/sessionService';
import contentrepositoryService from '../services/contentrepository/contentrepositoryService';
import { GetAllCourseRequest } from '../services/contentrepository/dto/Request/getAllCourseRequest';

import AppConsts from '../lib/appconst';

const pagesize = AppConsts.pagesize;

class ContentRepositoryStore {

    @observable userid!: string;
    @observable filters!: GetAllCourseRequest;

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

    @action
    async setFilter(getAllCourseRequest: GetAllCourseRequest) {

        runInAction(() => {
            this.filters = getAllCourseRequest;
        });
    }

    @action
    async initFilter() {

        runInAction(() => {
            this.filters = {
                courseCategoryId: '', courseDescription: '', courseName: '', pageIndex: 1, pageSize: pagesize, requesterUserId: this.userid,
                sortExp: 'courseName asc', status: true
            };
        });
    }

    @action
    async getAllCourses(getAllCourseRequest : GetAllCourseRequest) {

        let result = await contentrepositoryService.getAllCourses(getAllCourseRequest);
        return result;
    }
}

export default ContentRepositoryStore;
