import { action, observable } from 'mobx';

import { UserRequest } from '../services/user/dto/Request/userRequest';
import { EntityDto } from '../services/dto/entityDto';

import { PagedResultDto } from '../services/dto/pagedResultDto';

import { GetAllUserRequest } from "../services/user/dto/Request/getAllUserRequest";
import { GetAllUserResponse } from "../services/user/dto/Response/getAllUserResponse";
import { GetJobRolesResponse } from '../services/user/dto/Response/getJobRolesResponse';
import { GetUserEntityListRequest } from "../services/user/dto/Request/getUserEntityListRequest";
import { GetUserEntityListResponse } from "../services/user/dto/Response/getUserEntityListResponse";

import userService from '../services/user/userService';
import sessionService from '../services/session/sessionService';
import { UserOIGRequest } from '../services/user/dto/Request/userOIGRequest';
import { UserOIGResponse } from '../services/user/dto/Response/userOIGResponse';
import { UserByIDRequest } from '../services/user/dto/Request/userByIDRequest';
import { UserByIDResponse } from '../services/user/dto/Response/userByIDResponse';
import { UserEmailExistsCheckRequest } from '../services/user/dto/Request/userEmailExistsCheckRequest';
import { UserLoginExistsCheckRequest } from '../services/user/dto/Request/userLoginExistsCheckRequest';



class UserStore {

    @observable userid!: string;
    @observable users!: PagedResultDto<GetAllUserResponse>;
    @observable filters!: GetAllUserRequest;
    @observable userentity!: PagedResultDto<GetUserEntityListResponse>;
    @observable userjobroles!: PagedResultDto<GetJobRolesResponse>;
    @observable user!: UserRequest;
    @observable userOIG!: UserOIGResponse;
    @observable userById!: UserByIDResponse;
    @observable userExists!: string;

    @action
    async getAll(getAllUserRequest: GetAllUserRequest) {
        debugger;
        let result = await userService.getAll(getAllUserRequest);
        this.users = result;
    }

    @action
    async getUserById(getUserByIdRequest: UserByIDRequest) {
        debugger;
        let result = await userService.getUserById(getUserByIdRequest);
        this.userById = result;
    }

    @action
    async getEntityList(getUserEntityListRequest: GetUserEntityListRequest) {

        var userid = sessionService.getLoginUserId();
        getUserEntityListRequest.RequesterUserId = userid;
        let result = await userService.getEntityList(getUserEntityListRequest);

        this.userentity = result;

        return result;
    }

    @action
    async createUser() {
        this.user = {
            userId: '', firstName: '', lastName: '', emailAddress: '', loginId: '', contactNumber: '', cityId: '', countryId: '', departmentId: '', groupId: '', hiringDate: null, jobCodeId: '', profilePic: '', requesterUserId: this.filters.requesterUserId, roleChangeDate: null, stateId: '', status: true, timeZoneId: '', zipCode: ''
        };
        this.userById = {
            userId: '', firstName: '', lastName: '', emailAddress: '', loginId: '', contactNumber: '', hiringDate: null, zipCode: '', status: true, departmentId: '', jobCodeId: '', roleChangeDate: null, timeZoneId: '', profilePic: '', groupId: '', countryId: '', stateId: '', cityId: '', group1Name: '', group2Name: '', group3Name: '', group4Name: '', group5Name: '', isSuccess: true, totalCount: 0, createdDateDisplay: '', lastModifiedDateDisplay: ''
        };
        this.userentity = { items: [], totalCount: 0 };
    }

    @action
    async checkOIG(userOIGRequest: UserOIGRequest) {
        debugger;
        let result = await userService.checkOIG(userOIGRequest);
        debugger;
        this.userOIG = result;
    }

    @action
    async checkIsEmailInUse(userEmailCheckRequest: UserEmailExistsCheckRequest) {
        debugger;
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
        debugger;
        let result = await userService.create(addUserRequest);
        this.user = { userId: result, ...addUserRequest };

        let item: GetAllUserResponse;
        item = { userId: result, firstName: '', lastName: '', emailAddress: '', departmentCode: '', departmentName: '', jobCode: '', jobRole: '', group1Name: '', group2Name: '', group3Name: '', group4Name: '', group5Name: '', status: true, loginId: '', contactNumber: '', zipCode: '', displayStatus: '', departmentId: '', jobCodeId: '', isSuccess: true, totalCount: 0 };
        Object.assign(item, addUserRequest);

        this.users.items.push(item);
    }

    @action
    async update(updateUserRequest: UserRequest) {
        debugger;
        let result = await userService.update(updateUserRequest);

        let index = this.users.items.findIndex(p => p.userId === result);
        Object.assign(this.users.items[index], updateUserRequest);
    }

    @action
    async delete(entityDto: EntityDto) {
        //await userService.delete(entityDto);
        //this.users.items = this.users.items.filter((x: GetUserOutput) => x.id !== entityDto.id);
    }

    /* FILTERS ***/
    @action
    async initFilter() {
        this.userid = sessionService.getLoginUserId();

        //await this.getEntityList({ RequesterUserId: this.userid, SearchPhrase: '', GroupId: '' });

        this.userentity = { items: [], totalCount: 0 };

        this.filters = {
            emailAddress: '', firstName: '', lastName: '', departmentId: '', groupId: '', jobCodeId: '', searchOnGroupId: '', pageIndex: 1, pageSize: 10, requesterUserId: this.userid, sortExp: '', status: true,
            hiringDateFrom: null, hiringDateTo: null, roleChangeDateFrom: null, roleChangeDateTo: null
        };
    }
    /*** LOOKUP *****/

    @action
    async GetUserJobRoles() {
        let result = await userService.getJobRoles();
        this.userjobroles = result;
    }
}

export default UserStore;
