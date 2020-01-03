
import { PagedResultDto } from '../../services/dto/pagedResultDto';

import http from '../httpService';

import { EntityDto } from '../dto/entityDto';

import { Group1NameExistsCheckRequest } from './dto/Request/group1NameExistsCheckRequest';
import { Group1Response } from './dto/Response/group1Response';
import { SaveGroup1Request } from './dto/Request/saveGroup1Request';

import { Group2NameExistsCheckRequest } from './dto/Request/group2NameExistsCheckRequest';
import { Group2Response } from './dto/Response/group2Response';
import { SaveGroup2Request } from './dto/Request/saveGroup2Request';

import { Group3NameExistsCheckRequest } from './dto/Request/group3NameExistsCheckRequest';
import { Group3Response } from './dto/Response/group3Response';
import { SaveGroup3Request } from './dto/Request/saveGroup3Request';

import { Group4NameExistsCheckRequest } from './dto/Request/group4NameExistsCheckRequest';
import { Group4Response } from './dto/Response/group4Response';
import { SaveGroup4Request } from './dto/Request/saveGroup4Request';

import { Group5NameExistsCheckRequest } from './dto/Request/group5NameExistsCheckRequest';
import { Group5Response } from './dto/Response/group5Response';
import { SaveGroup5Request } from './dto/Request/saveGroup5Request';
import { LookupByTypeRequest } from '../dto/lookupByTypeRequest';
import { LookupByTypeResponse } from '../dto/lookupByTypeResponse';
import { GetAllSystemRoleResponse } from './dto/Response/getAllSystemRoleResponse';
import { SearchAssignmentRequest } from './dto/Request/searchAssignmentRequest';
import { SearchAssignmentResponse } from './dto/Response/searchAssignmentResponse';
import { GroupAdminUsersRequest } from './dto/Request/groupAdminUsersRequest';
import { GroupAdminUsersResponse } from './dto/Response/groupAdminUsersResponse';
import { SystemRoleRequest } from './dto/Request/systemRoleRequest';
import { SystemRoleDelRequest } from './dto/Request/systemRoleDelRequest';

declare var lms: any;

class GroupService {

    //#region HIERARCHY

    // #region GROUP1
    public async checkIsGroup1NameInUse(grNameCheckRequest: Group1NameExistsCheckRequest): Promise<string> {

        let result = await http.post(lms.group.toAPIPath(lms.group.APIType.NAMEEXISTSGR1), grNameCheckRequest);

        return result.data;
    }

    public async getAllGroup1(): Promise<PagedResultDto<Group1Response>> {
        let result = await http.get(lms.group.toAPIPath(lms.group.APIType.GETALLGR1));

        var data = <PagedResultDto<Group1Response>>{};
        data.items = result.data;
        data.totalCount = (data.items.length > 0) ? data.items.length : 0;

        return data;
    }

    public async getGroup1ById(entityDto: EntityDto): Promise<Group1Response> {

        let result = await http.get(lms.group.toAPIPath(lms.group.APIType.GETGR1), { params: { 'Group1Id': entityDto.id } });

        return result.data;
    }

    public async saveGroup1Data(saveGroupRequest: SaveGroup1Request): Promise<string> {

        var data = '';
        try {
            let result = await http.post(lms.group.toAPIPath(lms.group.APIType.SAVEGR1), saveGroupRequest);
            data = (result.status === 200) ? result.data : '';
        }
        catch (e) {
            data = e;
        }

        return data;
    }
    // #endregion

    // #region GROUP2
    public async checkIsGroup2NameInUse(grNameCheckRequest: Group2NameExistsCheckRequest): Promise<string> {

        let result = await http.post(lms.group.toAPIPath(lms.group.APIType.NAMEEXISTSGR2), grNameCheckRequest);

        return result.data;
    }

    public async getAllGroup2(entityDto: EntityDto): Promise<PagedResultDto<Group2Response>> {
        let result = await http.get(lms.group.toAPIPath(lms.group.APIType.GETALLGR2), { params: { 'Group1Id': entityDto.id } });

        var data = <PagedResultDto<Group2Response>>{};
        data.items = result.data;
        data.totalCount = (data.items.length > 0) ? data.items.length : 0;

        return data;
    }

    public async getGroup2ById(entityDto: EntityDto): Promise<Group2Response> {

        let result = await http.get(lms.group.toAPIPath(lms.group.APIType.GETGR2), { params: { 'Group2Id': entityDto.id } });

        return result.data;
    }

    public async saveGroup2Data(saveGroupRequest: SaveGroup2Request): Promise<string> {

        var data = '';
        try {
            let result = await http.post(lms.group.toAPIPath(lms.group.APIType.SAVEGR2), saveGroupRequest);
            data = (result.status === 200) ? result.data : '';
        }
        catch (e) {
            data = e;
        }

        return data;
    }
    // #endregion
    // #region GROUP3
    public async checkIsGroup3NameInUse(grNameCheckRequest: Group3NameExistsCheckRequest): Promise<string> {

        let result = await http.post(lms.group.toAPIPath(lms.group.APIType.NAMEEXISTSGR3), grNameCheckRequest);

        return result.data;
    }

    public async getAllGroup3(entityDto: EntityDto): Promise<PagedResultDto<Group3Response>> {
        let result = await http.get(lms.group.toAPIPath(lms.group.APIType.GETALLGR3), { params: { 'Group2Id': entityDto.id } });

        var data = <PagedResultDto<Group3Response>>{};
        data.items = result.data;
        data.totalCount = (data.items.length > 0) ? data.items.length : 0;

        return data;
    }

    public async getGroup3ById(entityDto: EntityDto): Promise<Group3Response> {

        let result = await http.get(lms.group.toAPIPath(lms.group.APIType.GETGR3), { params: { 'Group3Id': entityDto.id } });

        return result.data;
    }

    public async saveGroup3Data(saveGroupRequest: SaveGroup3Request): Promise<string> {

        var data = '';
        try {
            let result = await http.post(lms.group.toAPIPath(lms.group.APIType.SAVEGR3), saveGroupRequest);
            data = (result.status === 200) ? result.data : '';
        }
        catch (e) {
            data = e;
        }

        return data;
    }
    // #endregion
    // #region GROUP4
    public async checkIsGroup4NameInUse(grNameCheckRequest: Group4NameExistsCheckRequest): Promise<string> {

        let result = await http.post(lms.group.toAPIPath(lms.group.APIType.NAMEEXISTSGR4), grNameCheckRequest);

        return result.data;
    }

    public async getAllGroup4(entityDto: EntityDto): Promise<PagedResultDto<Group4Response>> {
        let result = await http.get(lms.group.toAPIPath(lms.group.APIType.GETALLGR4), { params: { 'Group3Id': entityDto.id } });

        var data = <PagedResultDto<Group4Response>>{};
        data.items = result.data;
        data.totalCount = (data.items.length > 0) ? data.items.length : 0;

        return data;
    }

    public async getGroup4ById(entityDto: EntityDto): Promise<Group4Response> {

        let result = await http.get(lms.group.toAPIPath(lms.group.APIType.GETGR4), { params: { 'Group4Id': entityDto.id } });

        return result.data;
    }

    public async saveGroup4Data(saveGroupRequest: SaveGroup4Request): Promise<string> {

        var data = '';
        try {
            let result = await http.post(lms.group.toAPIPath(lms.group.APIType.SAVEGR4), saveGroupRequest);
            data = (result.status === 200) ? result.data : '';
        }
        catch (e) {
            data = e;
        }

        return data;
    }
    // #endregion
    // #region GROUP5
    public async checkIsGroup5NameInUse(grNameCheckRequest: Group5NameExistsCheckRequest): Promise<string> {

        let result = await http.post(lms.group.toAPIPath(lms.group.APIType.NAMEEXISTSGR5), grNameCheckRequest);

        return result.data;
    }

    public async getAllGroup5(entityDto: EntityDto): Promise<PagedResultDto<Group5Response>> {
        let result = await http.get(lms.group.toAPIPath(lms.group.APIType.GETALLGR5), { params: { 'Group4Id': entityDto.id } });

        var data = <PagedResultDto<Group5Response>>{};
        data.items = result.data;
        data.totalCount = (data.items.length > 0) ? data.items.length : 0;

        return data;
    }

    public async getGroup5ById(entityDto: EntityDto): Promise<Group5Response> {

        let result = await http.get(lms.group.toAPIPath(lms.group.APIType.GETGR5), { params: { 'Group5Id': entityDto.id } });

        return result.data;
    }

    public async saveGroup5Data(saveGroupRequest: SaveGroup5Request): Promise<string> {

        var data = '';
        try {
            let result = await http.post(lms.group.toAPIPath(lms.group.APIType.SAVEGR5), saveGroupRequest);
            data = (result.status === 200) ? result.data : '';
        }
        catch (e) {
            data = e;
        }

        return data;
    }
    // #endregion
    public async getLevelMasterData(lookupByTypeRequest: LookupByTypeRequest): Promise<PagedResultDto<LookupByTypeResponse>> {

        var data = <PagedResultDto<LookupByTypeResponse>>{};
        try {
            var URL = lms.group.toAPIPath(lms.group.APIType.LEVELMASTER) + '?' + 'LookupType=' + lookupByTypeRequest.LookupType
            let result = await http.post(URL);
            data.items = result.data;
            data.totalCount = data.items.length;
            return data;
        }
        catch (e) {
            console.log(e);
        }
        return data;
    }

    public async getGroupLookups(): Promise<string> {

        let result = await http.get(lms.group.toAPIPath(lms.group.APIType.GROUPLOOKUPS));

        return JSON.stringify(result.data);
    }

    // #endregion

    // #region SYSTEM ROLES

    public async getAllSystemRoles(): Promise<PagedResultDto<GetAllSystemRoleResponse>> {

        let result = await http.get(lms.group.toAPIPath(lms.group.APIType.GETALLROLES));

        var data = <PagedResultDto<GetAllSystemRoleResponse>>{};
        data.items = result.data;
        data.totalCount = (data.items.length > 0) ? data.items.length : 0;

        return data;
    }

    public async searchAssignment( searchAssignmentRequest : SearchAssignmentRequest): Promise<PagedResultDto<SearchAssignmentResponse>> {

        let result = await http.get(lms.group.toAPIPath(lms.group.APIType.SEARCHASSIGNMENT), { params: searchAssignmentRequest });

        var data = <PagedResultDto<SearchAssignmentResponse>>{};
        data.items = result.data;
        data.totalCount = (data.items.length > 0) ? data.items.length : 0;

        return data;
    }

    public async getGroupAdminUsers(groupAdminUsersRequest: GroupAdminUsersRequest): Promise<PagedResultDto<GroupAdminUsersResponse>> {

        let result = await http.get(lms.group.toAPIPath(lms.group.APIType.GRADMINUSERS), { params: groupAdminUsersRequest });

        var data = <PagedResultDto<GroupAdminUsersResponse>>{};
        data.items = result.data;
        data.totalCount = (data.items.length > 0) ? data.items.length : 0;

        return data;
    }

    public async userRoleActiveInactive(systemRoleRequest: SystemRoleRequest): Promise<string> {

        var data = '';
        try {
            let result = await http.post(lms.group.toAPIPath(lms.group.APIType.ACTIVEINACTIVEROLE), systemRoleRequest);
            data = (result.status === 200) ? result.data : '';
        }
        catch (e) {
            data = e;
        }

        return data;
    }

    public async userRoleAssign(systemRoleRequest: SystemRoleRequest): Promise<string> {

        var data = '';
        try {
            let result = await http.post(lms.group.toAPIPath(lms.group.APIType.ASSIGNROLE), systemRoleRequest);
            data = (result.status === 200) ? result.data : '';
        }
        catch (e) {
            data = e;
        }

        return data;
    }

    public async userRoleUnassign(systemRoleDelRequest: SystemRoleDelRequest): Promise<string> {

        var data = '';
        try {
            let result = await http.get(lms.group.toAPIPath(lms.group.APIType.DELROLE), { params: systemRoleDelRequest});
            data = (result.status === 200) ? result.data : '';
        }
        catch (e) {
            data = e;
        }

        return data;
    }

    // #endregion

}

export default new GroupService();
