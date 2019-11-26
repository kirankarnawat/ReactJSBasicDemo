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


class UserStore {

    @observable users!: PagedResultDto<GetAllUserResponse>;
    @observable filters!: GetAllUserRequest;
    @observable userentity!: PagedResultDto<GetUserEntityListResponse>;
    @observable userjobroles!: PagedResultDto<GetJobRolesResponse>;
    @observable user!: UserRequest;

    @action
    async getAll(getAllUserRequest: GetAllUserRequest) {
        let result = await userService.getAll(getAllUserRequest);
        this.users = result;
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

    @action
    async get(entityDto: EntityDto) {
        //let result = await userService.get(entityDto);
        //this.user = result;
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
