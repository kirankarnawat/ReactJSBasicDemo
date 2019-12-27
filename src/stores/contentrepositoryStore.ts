import { action, observable, runInAction } from 'mobx';

import sessionService from '../services/session/sessionService';
import contentrepositoryService from '../services/contentrepository/contentrepositoryService';
import { GetAllCourseRequest } from '../services/contentrepository/dto/Request/getAllCourseRequest';

import AppConsts from '../lib/appconst';
import { CourseCategoryResponse } from '../services/contentrepository/dto/Response/courseCategoryResponse';
import { CourseDurationHHResponse } from '../services/contentrepository/dto/Response/courseDurationHHResponse';
import { CourseDurationMMResponse } from '../services/contentrepository/dto/Response/courseDurationMMResponse';
import { CourseLaunchPreferenceResponse } from '../services/contentrepository/dto/Response/courseLaunchPreferenceResponse';
import { GetCourseRequest } from '../services/contentrepository/dto/Request/getCourseRequest';
import { CourseNameExistsCheckRequest } from '../services/contentrepository/dto/Request/courseNameExistsCheckRequest';
import { UploadCourseRequest } from '../services/contentrepository/dto/Request/uploadCourseRequest';
import { AddEditCourseRequest } from '../services/contentrepository/dto/Request/addEditCourseRequest';
import { CourseKeywordExistsCheckRequest } from '../services/contentrepository/dto/Request/courseKeywordExistsCheckRequest';
import { AddCourseKeywordRequest } from '../services/contentrepository/dto/Request/addCourseKeywordRequest';
import { EntityDto } from '../services/dto/entityDto';

const pagesize = AppConsts.pagesize;

class ContentRepositoryStore {

    @observable userid!: string;
    @observable filters!: GetAllCourseRequest;
    @observable coursecategory!: CourseCategoryResponse[];
    @observable courseDurationHH!: CourseDurationHHResponse[];
    @observable courseDurationMM!: CourseDurationMMResponse[];
    @observable courseLaunchPreference!: CourseLaunchPreferenceResponse[];
    @observable courseById!: AddEditCourseRequest;
    @observable courseExists!: string;

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
    async getAllCourses(getAllCourseRequest: GetAllCourseRequest) {

        let result = await contentrepositoryService.getAllCourses(getAllCourseRequest);
        return result;
    }

    @action
    async getCourseLookups() {

        let result = JSON.parse(await contentrepositoryService.getCourseCategory());
        result
        runInAction(() => {

            this.coursecategory = result["listCourseCategory"];
            this.courseDurationHH = result["listCourseDurationHH"];
            this.courseDurationMM = result["listCourseDurationMM"];
            this.courseLaunchPreference = result["listLaunchPreference"];
        });
    }

    @action
    async createCourse() {

        runInAction(() => {

            this.courseById = {
                courseId: '', courseName: '', courseDescription: '', coursePrice: null, courseDurationHH: 0, courseDurationMM: 0, showCourseHeaderImage: false,
                courseHeaderImage: '', isPrintCertificate: false, isInCatalog: false, launchPreference: '', windowSizeHeight: 0, windowSizeWidth: 0,
                expiryDate: null, status: true, courseCategoryId: '', courseUniqueId: 0, requesterUserId: '', listCourseMasterKeyWord: []
            };
        });
    }

    @action
    async getCourse(getCourseRequest: GetCourseRequest) {
        debugger;
        let result = await contentrepositoryService.getCourse(getCourseRequest);       

        runInAction(() => {
            this.courseById = result;

            //to handle not 0 issue
            if (this.courseById.coursePrice === 0) this.courseById.coursePrice = null;
        });
    }

    @action
    async checkIsCourseNameInUse(courseNameCheckRequest: CourseNameExistsCheckRequest) {

        let result = await contentrepositoryService.checkIsCourseNameInUse(courseNameCheckRequest);

        runInAction(() => {
            this.courseExists = result.toString().toLowerCase();
        });
    }

    @action
    async uploadCourse(uploadCourseRequest: UploadCourseRequest) {

        let result = await contentrepositoryService.uploadCourse(uploadCourseRequest);
        return result;
    }

    @action
    async addeditCourse(addeditCourseRequest: AddEditCourseRequest) {

        let result = await contentrepositoryService.addeditCourse(addeditCourseRequest);

        if (result) this.getCourse({ courseId: result, requesterUserId: this.userid, status: true, creatorName: '' })

        return result;
    }

    @action
    async checkIsCourseKeywordInUse(courseKeywordExistsCheckRequest: CourseKeywordExistsCheckRequest) {

        let result = await contentrepositoryService.checkIsCourseKeywordInUse(courseKeywordExistsCheckRequest);

        return result.toString().toLowerCase();
    }

    @action
    async addCourseKeyword(addCourseKeywordRequest: AddCourseKeywordRequest) {

        let result = await contentrepositoryService.addCourseKeyword(addCourseKeywordRequest);

        if (result) this.getCourse({ courseId: addCourseKeywordRequest.courseId, requesterUserId: this.userid, status: true, creatorName: '' })

        return result;
    }

    @action
    async removeCourseKeyword(entityDto: EntityDto) {

        let result = await contentrepositoryService.removeCourseKeyword(entityDto);

        return result;
    }
}

export default ContentRepositoryStore;
