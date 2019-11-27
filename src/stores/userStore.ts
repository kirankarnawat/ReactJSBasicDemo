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
import { UserExistsCheckResponse } from '../services/user/dto/Response/userExistsCheckResponse';


class UserStore {

    @observable users!: PagedResultDto<GetAllUserResponse>;
    @observable filters!: GetAllUserRequest;
    @observable userentity!: PagedResultDto<GetUserEntityListResponse>;
    @observable userjobroles!: PagedResultDto<GetJobRolesResponse>;
    @observable user!: UserRequest;
    @observable userOIG!: UserOIGResponse;
    @observable userById!: UserByIDResponse;
    @observable userExists!: UserExistsCheckResponse;

    @action
    async getAll(getAllUserRequest: GetAllUserRequest) {
        let result = await userService.getAll(getAllUserRequest);
        this.users = result;
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

        this.userentity = result;

        return result;
    }

    @action
    async createUser() {
        this.user = {
            userId: '', firstName: '', lastName: '', emailAddress: '', loginId: '', contactNumber: '', cityId: '', countryId: '', departmentId: '', groupId: '', hiringDate: null, jobCodeId: '', profilePic: '', requesterUserId: this.filters.requesterUserId, roleChangeDate: null, stateId: '', status: true, timeZoneId: '', zipCode: ''
        };
    }

    @action
    async checkOIG(userOIGRequest: UserOIGRequest) {
        let result = await userService.checkOIG(userOIGRequest);
        this.userOIG = result;
    }

    @action
    async checkIsEmailInUse(userEmailCheckRequest: UserEmailExistsCheckRequest) {
        let result = await userService.checkIsEmailInUse(userEmailCheckRequest);
        this.userExists = result;
    }

    @action
    async checkIsLoginIdInUse(userLoginCheckRequest: UserLoginExistsCheckRequest) {
        let result = await userService.checkIsLoginIdInUse(userLoginCheckRequest);
        this.userExists = result;
    }

    @action
    async create(addUserRequest: UserRequest) {
        debugger;
        let result = await userService.create(addUserRequest);
        addUserRequest.userId = result;
        //this.users.items.push();
    }

    @action
    async update(updateUserRequest: UserRequest) {
        //let result = await userService.update(updateUserInput);
        //this.users.items = this.users.items.map((x: GetUserOutput) => {
        //    if (x.id === updateUserInput.id) x = result;
        //    return x;
        //});
    }

    @action
    async delete(entityDto: EntityDto) {
        //await userService.delete(entityDto);
        //this.users.items = this.users.items.filter((x: GetUserOutput) => x.id !== entityDto.id);
    }

    /* FILTERS ***/
    @action
    async initFilter() {
       
        var userid = sessionService.getLoginUserId();

        await this.getEntityList({ RequesterUserId: userid, SearchPhrase: '', GroupId: '' });

        this.filters = {
            emailAddress: '', firstName: '', lastName: '', departmentId: '', groupId: '', jobCodeId: '', searchOnGroupId: '', pageIndex: 1, pageSize: 10, requesterUserId: userid, sortExp: '', status: true,
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
