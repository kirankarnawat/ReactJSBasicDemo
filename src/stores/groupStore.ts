
import { action, observable, runInAction } from 'mobx';

import groupService from '../services/group/groupService';
import sessionService from '../services/session/sessionService';

import { EntityDto } from '../services/dto/entityDto';

import { Group1NameExistsCheckRequest } from '../services/group/dto/Request/group1NameExistsCheckRequest';
import { Group1Response } from '../services/group/dto/Response/group1Response';
import { SaveGroup1Request } from '../services/group/dto/Request/saveGroup1Request';

import { Group2NameExistsCheckRequest } from '../services/group/dto/Request/group2NameExistsCheckRequest';
import { Group2Response } from '../services/group/dto/Response/group2Response';
import { SaveGroup2Request } from '../services/group/dto/Request/saveGroup2Request';

import { Group3NameExistsCheckRequest } from '../services/group/dto/Request/group3NameExistsCheckRequest';
import { Group3Response } from '../services/group/dto/Response/group3Response';
import { SaveGroup3Request } from '../services/group/dto/Request/saveGroup3Request';

import { Group4NameExistsCheckRequest } from '../services/group/dto/Request/group4NameExistsCheckRequest';
import { Group4Response } from '../services/group/dto/Response/group4Response';
import { SaveGroup4Request } from '../services/group/dto/Request/saveGroup4Request';

import { Group5NameExistsCheckRequest } from '../services/group/dto/Request/group5NameExistsCheckRequest';
import { Group5Response } from '../services/group/dto/Response/group5Response';
import { SaveGroup5Request } from '../services/group/dto/Request/saveGroup5Request';

import { PagedResultDto } from '../services/dto/pagedResultDto';

import { LookupByTypeRequest } from '../services/dto/lookupByTypeRequest';
import { LookupByTypeResponse } from '../services/dto/lookupByTypeResponse';

import { GroupResponse } from '../services/group/dto/Response/groupResponse';
import { GetCountryResponse } from '../services/group/dto/Response/getCountryResponse';
import { GetStateResponse } from '../services/group/dto/Response/getStateResponse';
import { GetCityResponse } from '../services/group/dto/Response/getCityResponse';
import { GetAllSystemRoleResponse } from '../services/group/dto/Response/getAllSystemRoleResponse';
import { SearchAssignmentRequest } from '../services/group/dto/Request/searchAssignmentRequest';
import { GroupAdminUsersRequest } from '../services/group/dto/Request/groupAdminUsersRequest';
import { SystemRoleRequest } from '../services/group/dto/Request/systemRoleRequest';

import { SystemUserRequest } from '../services/group/dto/Request/systemUserRequest';
import { SystemUserAssignRequest } from '../services/group/dto/Request/systemUserAssignRequest';

class GroupStore {

    @observable userid!: string;
    @observable grExists!: string;

    @observable grById !: GroupResponse;
    @observable gr1All !: PagedResultDto<Group1Response>;
    @observable gr2All !: PagedResultDto<Group2Response>;
    @observable gr3All !: PagedResultDto<Group3Response>;
    @observable gr4All !: PagedResultDto<Group4Response>;
    @observable gr5All !: PagedResultDto<Group5Response>;

    @observable groupLevelMaster !: PagedResultDto<LookupByTypeResponse>;
    @observable groupCountry !: PagedResultDto<GetCountryResponse>;
    @observable groupState !: PagedResultDto<GetStateResponse>;
    @observable groupCity !: PagedResultDto<GetCityResponse>;

    @observable systemRolesAll !: PagedResultDto<GetAllSystemRoleResponse>;

    @action
    async getLevelMasterData(lookupByTypeRequest: LookupByTypeRequest) {

        let result = await groupService.getLevelMasterData(lookupByTypeRequest);

        runInAction(() => {
            this.groupLevelMaster = result;
            this.userid = sessionService.getLoginUserId();
        });
    }

    @action
    async getGroupLookups() {
        debugger;
        let result = JSON.parse(await groupService.getGroupLookups());

        var countryLst = <PagedResultDto<GetCountryResponse>>{};
        var stateLst = <PagedResultDto<GetStateResponse>>{};
        var cityLst = <PagedResultDto<GetCityResponse>>{};

        countryLst.items = result["listCountries"];
        countryLst.totalCount = countryLst.items.length;

        stateLst.items = result["listStates"];
        stateLst.totalCount = stateLst.items.length;

        cityLst.items = result["listCities"];
        cityLst.totalCount = cityLst.items.length;

        runInAction(() => {

            this.groupCountry = countryLst;
            this.groupCity = cityLst;
            this.groupState = stateLst;
        });
    }

    @action
    async createGroup(parentid: string) {

        runInAction(() => {
            this.grById = {
                cityId: '', countryId: '', creatorName: '', groupId: '', groupName: '', groupParentId: parentid, location: '', stateId: '', status: true, zipCode: ''
            };
        });
    }

    // #region Group1 Actions
    @action
    async checkIsGroup1NameInUse(grNameCheckRequest: Group1NameExistsCheckRequest) {
        debugger;
        let result = await groupService.checkIsGroup1NameInUse(grNameCheckRequest);

        runInAction(() => {
            this.grExists = result.toString().toLowerCase();
        });
    }

    @action
    async getAllGroup1Data() {

        let result = await groupService.getAllGroup1();

        runInAction(() => {
            this.gr1All = result;
            this.gr2All = { items: [], totalCount: 0 };
            this.gr3All = { items: [], totalCount: 0 };
            this.gr4All = { items: [], totalCount: 0 };
            this.gr5All = { items: [], totalCount: 0 };
        });
    }

    @action
    async getGroup1DataById(entityDto: EntityDto) {

        let result = await groupService.getGroup1ById(entityDto);

        runInAction(() => {
            this.grById = {
                groupId: result.group1Id, groupName: result.group1Name, cityId: result.cityId, countryId: result.countryId,
                groupParentId: '', location: '', creatorName: result.creatorName, stateId: result.stateId, status: result.status, zipCode: result.zipCode
            };
        });
    }

    @action
    async saveGroup1Data(saveGroupRequest: GroupResponse) {

        var saveGroup1Request: SaveGroup1Request;
        saveGroup1Request = {
            group1Id: saveGroupRequest.groupId, group1Name: saveGroupRequest.groupName, cityId: saveGroupRequest.cityId, countryId: saveGroupRequest.countryId,
            creatorName: saveGroupRequest.creatorName, description: '', requesterUserId: this.userid, stateId: saveGroupRequest.stateId, status: saveGroupRequest.status, zipCode: saveGroupRequest.zipCode
        }

        let result = await groupService.saveGroup1Data(saveGroup1Request);

        let updatedresult = await groupService.getAllGroup1();

        runInAction(() => {

            this.grById = ({ ...this.grById, groupId: result });
            this.gr1All = updatedresult;
        });

        return result;
    }

    // #endregion

    // #region Group2 Actions
    @action
    async checkIsGroup2NameInUse(grNameCheckRequest: Group2NameExistsCheckRequest) {
        debugger;
        let result = await groupService.checkIsGroup2NameInUse(grNameCheckRequest);

        runInAction(() => {
            this.grExists = result.toString().toLowerCase();
        });
    }

    @action
    async getAllGroup2Data(entityDto: EntityDto) {

        let result = await groupService.getAllGroup2(entityDto);

        runInAction(() => {
            this.gr2All = result;
            this.gr3All = { items: [], totalCount: 0 };
            this.gr4All = { items: [], totalCount: 0 };
            this.gr5All = { items: [], totalCount: 0 };
        });
    }

    @action
    async getGroup2DataById(entityDto: EntityDto) {

        let result = await groupService.getGroup2ById(entityDto);

        runInAction(() => {
            this.grById = {
                cityId: result.cityId, countryId: result.countryId, creatorName: result.creatorName, groupId: result.group2Id,
                groupName: result.group2Name, groupParentId: result.group1Id, location: '', stateId: result.stateId, status: result.status, zipCode: result.zipCode
            };
        });
    }

    @action
    async saveGroup2Data(saveGroupRequest: GroupResponse) {

        var saveGroup2Request: SaveGroup2Request;
        saveGroup2Request = {
            group2Id: saveGroupRequest.groupId, group2Name: saveGroupRequest.groupName, group1Id: saveGroupRequest.groupParentId, cityId: saveGroupRequest.cityId, countryId: saveGroupRequest.countryId,
            creatorName: saveGroupRequest.creatorName, description: '', requesterUserId: this.userid, stateId: saveGroupRequest.stateId, status: saveGroupRequest.status, zipCode: saveGroupRequest.zipCode,
            isVirtual: false
        }

        let result = await groupService.saveGroup2Data(saveGroup2Request);

        let updatedresult = await groupService.getAllGroup2({ id: saveGroupRequest.groupParentId });

        runInAction(() => {

            this.grById = ({ ...this.grById, groupId: result });
            this.gr2All = updatedresult;
        });

        return result;
    }

    // #endregion

    // #region Group3 Actions
    @action
    async checkIsGroup3NameInUse(grNameCheckRequest: Group3NameExistsCheckRequest) {

        let result = await groupService.checkIsGroup3NameInUse(grNameCheckRequest);

        runInAction(() => {
            this.grExists = result.toString().toLowerCase();
        });
    }

    @action
    async getAllGroup3Data(entityDto: EntityDto) {

        let result = await groupService.getAllGroup3(entityDto);

        runInAction(() => {
            this.gr3All = result;
            this.gr4All = { items: [], totalCount: 0 };
            this.gr5All = { items: [], totalCount: 0 };
        });
    }

    @action
    async getGroup3DataById(entityDto: EntityDto) {

        let result = await groupService.getGroup3ById(entityDto);

        runInAction(() => {
            this.grById = {
                cityId: result.cityId, countryId: result.countryId, creatorName: result.creatorName, groupId: result.group3Id,
                groupName: result.group3Name, groupParentId: result.group2Id, location: '', stateId: result.stateId, status: result.status, zipCode: result.zipCode
            };
        });
    }

    @action
    async saveGroup3Data(saveGroupRequest: GroupResponse) {

        var saveGroup3Request: SaveGroup3Request
        saveGroup3Request = {
            group3Id: saveGroupRequest.groupId, group3Name: saveGroupRequest.groupName, group2Id: saveGroupRequest.groupParentId, cityId: saveGroupRequest.cityId, countryId: saveGroupRequest.countryId,
            creatorName: saveGroupRequest.creatorName, description: '', requesterUserId: this.userid, stateId: saveGroupRequest.stateId, status: saveGroupRequest.status, zipCode: saveGroupRequest.zipCode,
            isVirtual: false
        }

        let result = await groupService.saveGroup3Data(saveGroup3Request);

        let updatedresult = await groupService.getAllGroup3({ id: saveGroupRequest.groupParentId });

        runInAction(() => {

            this.grById = ({ ...this.grById, groupId: result });
            this.gr3All = updatedresult;
        });

        return result;
    }

    // #endregion

    // #region Group4 Actions
    @action
    async checkIsGroup4NameInUse(grNameCheckRequest: Group4NameExistsCheckRequest) {

        let result = await groupService.checkIsGroup4NameInUse(grNameCheckRequest);

        runInAction(() => {
            this.grExists = result.toString().toLowerCase();
        });
    }

    @action
    async getAllGroup4Data(entityDto: EntityDto) {

        let result = await groupService.getAllGroup4(entityDto);

        runInAction(() => {
            this.gr4All = result;
            this.gr5All = { items: [], totalCount: 0 };
        });
    }

    @action
    async getGroup4DataById(entityDto: EntityDto) {

        let result = await groupService.getGroup4ById(entityDto);

        runInAction(() => {
            this.grById = {
                cityId: result.cityId, countryId: result.countryId, creatorName: result.creatorName, groupId: result.group4Id,
                groupName: result.group4Name, groupParentId: result.group3Id, location: '', stateId: result.stateId, status: result.status, zipCode: result.zipCode
            };
        });
    }

    @action
    async saveGroup4Data(saveGroupRequest: GroupResponse) {

        var saveGroup4Request: SaveGroup4Request
        saveGroup4Request = {
            group4Id: saveGroupRequest.groupId, group4Name: saveGroupRequest.groupName, group3Id: saveGroupRequest.groupParentId, cityId: saveGroupRequest.cityId, countryId: saveGroupRequest.countryId,
            creatorName: saveGroupRequest.creatorName, description: '', requesterUserId: this.userid, stateId: saveGroupRequest.stateId, status: saveGroupRequest.status, zipCode: saveGroupRequest.zipCode,
            isVirtual: false
        }

        let result = await groupService.saveGroup4Data(saveGroup4Request);

        let updatedresult = await groupService.getAllGroup4({ id: saveGroupRequest.groupParentId });

        runInAction(() => {

            this.grById = ({ ...this.grById, groupId: result });
            this.gr4All = updatedresult;
        });

        return result;
    }

    // #endregion

    // #region Group5 Actions
    @action
    async checkIsGroup5NameInUse(grNameCheckRequest: Group5NameExistsCheckRequest) {

        let result = await groupService.checkIsGroup5NameInUse(grNameCheckRequest);

        runInAction(() => {
            this.grExists = result.toString().toLowerCase();
        });
    }

    @action
    async getAllGroup5Data(entityDto: EntityDto) {

        let result = await groupService.getAllGroup5(entityDto);

        runInAction(() => {
            this.gr5All = result;
        });
    }

    @action
    async getGroup5DataById(entityDto: EntityDto) {

        let result = await groupService.getGroup5ById(entityDto);

        runInAction(() => {
            this.grById = {
                cityId: result.cityId, countryId: result.countryId, creatorName: result.creatorName, groupId: result.group5Id,
                groupName: result.group5Name, groupParentId: result.group4Id, location: '', stateId: result.stateId, status: result.status, zipCode: result.zipCode
            };
        });
    }

    @action
    async saveGroup5Data(saveGroupRequest: GroupResponse) {

        var saveGroup5Request: SaveGroup5Request
        saveGroup5Request = {
            group5Id: saveGroupRequest.groupId, group5Name: saveGroupRequest.groupName, group4Id: saveGroupRequest.groupParentId, cityId: saveGroupRequest.cityId, countryId: saveGroupRequest.countryId,
            creatorName: saveGroupRequest.creatorName, description: '', requesterUserId: this.userid, stateId: saveGroupRequest.stateId, status: saveGroupRequest.status, zipCode: saveGroupRequest.zipCode,
            location: saveGroupRequest.location
        }

        let result = await groupService.saveGroup5Data(saveGroup5Request);

        let updatedresult = await groupService.getAllGroup5({ id: saveGroupRequest.groupParentId });

        runInAction(() => {

            this.grById = ({ ...this.grById, groupId: result });
            this.gr5All = updatedresult;
        });

        return result;
    }

    // #endregion

    // #region System Roles

    @action
    async getAllSystemRoles() {

        let result = await groupService.getAllSystemRoles();

        runInAction(() => {
            this.systemRolesAll = result;
        });
    }

    @action
    async searchAssignment(searchAssignmentRequest: SearchAssignmentRequest) {

        let result = await groupService.searchAssignment(searchAssignmentRequest);

        return result;
    }

    @action
    async getGroupAdminUsers(groupAdminUsersRequest: GroupAdminUsersRequest) {

        let result = await groupService.getGroupAdminUsers(groupAdminUsersRequest);

        return result;
    }

    @action
    async userRoleActiveInactive(systemRoleRequest: SystemRoleRequest) {

        let result = await groupService.userRoleActiveInactive(systemRoleRequest);

        return result;
    }

    @action
    async userRoleAssign(systemUserAssignRequest: SystemUserAssignRequest) {

        let result = await groupService.userRoleAssign(systemUserAssignRequest);

        return result;
    }

    //@action
    //async userRoleUnassign(systemRoleDelRequest: SystemRoleDelRequest) {

    //    let result = await groupService.userRoleUnassign(systemRoleDelRequest);

    //    return result;
    //}

    @action
    async getSystemUsers(systemUserRequest: SystemUserRequest) {

        let result = await groupService.getSystemUsers(systemUserRequest);

        return result;
    }

    // #endregion


}
export default GroupStore;
