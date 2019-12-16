import { action, observable } from 'mobx';

import { UserRequest } from '../services/user/dto/Request/userRequest';
import { EntityDto } from '../services/dto/entityDto';

import { PagedResultDto } from '../services/dto/pagedResultDto';

import { GetAllUserRequest } from "../services/user/dto/Request/getAllUserRequest";
import { GetJobRolesResponse } from '../services/user/dto/Response/getJobRolesResponse';
import { GetUserEntityListRequest } from "../services/user/dto/Request/getUserEntityListRequest";

import userService from '../services/user/userService';
import sessionService from '../services/session/sessionService';
import { UserOIGRequest } from '../services/user/dto/Request/userOIGRequest';
import { UserOIGResponse } from '../services/user/dto/Response/userOIGResponse';
import { UserByIDRequest } from '../services/user/dto/Request/userByIDRequest';
import { UserByIDResponse } from '../services/user/dto/Response/userByIDResponse';
import { UserEmailExistsCheckRequest } from '../services/user/dto/Request/userEmailExistsCheckRequest';
import { UserLoginExistsCheckRequest } from '../services/user/dto/Request/userLoginExistsCheckRequest';
import { UserImportRequest } from '../services/user/dto/Request/userImportRequest';
import { SaveOIGUserRequest } from '../services/user/dto/Request/saveOIGUserRequest';
import { LookupByTypeRequest } from '../services/dto/lookupByTypeRequest';
import { LookupByTypeResponse } from '../services/dto/lookupByTypeResponse';
import { UserBulkImportListRequest } from '../services/user/dto/Request/userBulkImportListRequest';

import AppConsts from '../lib/appconst';
import { UserChangePasswordRequest } from '../services/user/dto/Request/userChangePasswordRequest';

const pagesize = AppConsts.pagesize;

class UserStore {

    @observable userid!: string;
    @observable filters!: GetAllUserRequest;
    @observable userjobroles!: PagedResultDto<GetJobRolesResponse>;
    @observable userOIG!: UserOIGResponse;
    @observable userById!: UserByIDResponse;
    @observable userExists!: string;
    @observable userBulkImportStatus!: PagedResultDto<LookupByTypeResponse>;
    @observable bulkfilters!: UserBulkImportListRequest;

    @action
    async getAll(getAllUserRequest: GetAllUserRequest) {
        
        let result = await userService.getAll(getAllUserRequest);
        return result;
    }

    @action
    async getUserById(getUserByIdRequest: UserByIDRequest) {
        
        let result = await userService.getUserById(getUserByIdRequest);
        this.userById = result;
    }

    @action
    async getEntityList(getUserEntityListRequest: GetUserEntityListRequest) {

        var userid = sessionService.getLoginUserId();
        getUserEntityListRequest.RequesterUserId = userid;
        let result = await userService.getEntityList(getUserEntityListRequest);

        return result;
    }

    @action
    async createUser() {
        this.userById = {
            userId: '', firstName: '', lastName: '', emailAddress: '', loginId: '', contactNumber: '', hiringDate: null, zipCode: '', status: true, departmentId: '', jobCodeId: '', roleChangeDate: null, timeZoneId: '', profilePic: '', groupId: '', countryId: '', stateId: '', cityId: '', group1Name: '', group2Name: '', group3Name: '', group4Name: '', group5Name: '', isSuccess: true, totalCount: 0, createdDateDisplay: '', lastModifiedDateDisplay: ''
        };
    }

    @action
    async setFilter(getAllUserRequest: GetAllUserRequest) {
        this.filters = getAllUserRequest;
    }

    @action
    async checkOIG(userOIGRequest: UserOIGRequest) {
        
        let result = await userService.checkOIG(userOIGRequest);
        
        this.userOIG = result;
    }

    @action
    async checkIsEmailInUse(userEmailCheckRequest: UserEmailExistsCheckRequest) {
        
        let result = await userService.checkIsEmailInUse(userEmailCheckRequest);
        this.userExists = result.toString().toLowerCase();
    }

    @action
    async checkIsLoginIdInUse(userLoginCheckRequest: UserLoginExistsCheckRequest) {
        let result = await userService.checkIsLoginIdInUse(userLoginCheckRequest);
        this.userExists = result.toString().toLowerCase();
    }


    @action
    async create(addUserRequest: UserRequest) {
        let result = await userService.create(addUserRequest);
        this.userById = { ...this.userById, userId: result };
    }

    @action
    async update(updateUserRequest: UserRequest) {
        let result = await userService.update(updateUserRequest);
        this.userById = { ...this.userById, userId: result };
    }

    @action
    async downloadBulkTemplate() {
        
        let result = await userService.donloadUserTemplate();
        return result;
    }

    @action
    async uploadBulkImport(userImportRequest: UserImportRequest) {
        
        let result = await userService.uploadUserImport(userImportRequest);
        return result;
    }

    @action
    async getUserBulkImportLog(entityDto: EntityDto) {
        
        let result = await userService.getUserBulkImportLog(entityDto.id);
        return result;
    }

    @action
    async saveOIGUser(saveOIGUserRequest: SaveOIGUserRequest) {
        
        let result = await userService.saveOIGUser(saveOIGUserRequest);
        return result;
    }

    @action
    async initFilter() {
        this.userid = sessionService.getLoginUserId();

        this.filters = {
            emailAddress: '', firstName: '', lastName: '', departmentId: '', groupId: '', jobCodeId: '', searchOnGroupId: '', pageIndex: 1, pageSize: pagesize, requesterUserId: this.userid, sortExp: '', status: true,
            hiringDateFrom: null, hiringDateTo: null, roleChangeDateFrom: null, roleChangeDateTo: null
        };
    }

    @action
    async getUserJobRoles() {
        let result = await userService.getJobRoles();
        this.userjobroles = result;
    }

    @action
    async getUserBulkImportStatus(lookupByTypeRequest: LookupByTypeRequest) {
        let result = await userService.getBulkImportStatus(lookupByTypeRequest);
        this.userBulkImportStatus = result;
    }

    @action
    async getAllBulkImportHistory(userBulkImportListRequest: UserBulkImportListRequest) {
        let result = await userService.getAllBulkImportHistory(userBulkImportListRequest);
        return result;
    }

    @action
    async initBulkFilter() {
        debugger;
        this.userid = sessionService.getLoginUserId();
        this.bulkfilters = { importStatus: '', pageIndex: 1, pageSize: pagesize, requesterUserId: this.userid, sortExp: '' };
    }

    @action
    async setBulkFilter(userBulkImportListRequest: UserBulkImportListRequest) {
        this.bulkfilters = userBulkImportListRequest;
    }

    @action
    async downloadBulkImportFile(bulkImportId: string) {

        let result = await userService.downloadBulkUploadedFile(bulkImportId);
        return result;
    }

    @action
    async changePassword( userChangePasswordRequest : UserChangePasswordRequest) {

        let result = await userService.changePassword(userChangePasswordRequest);
        return result;
    }
}

export default UserStore;
