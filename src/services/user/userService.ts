
import { PagedResultDto } from '../../services/dto/pagedResultDto';
import { GetAllUserRequest } from "./dto/Request/getAllUserRequest";
import { GetAllUserResponse } from "./dto/Response/getAllUserResponse";
import { GetUserEntityListRequest } from "./dto/Request/getUserEntityListRequest";
import { GetUserEntityListResponse } from "./dto/Response/getUserEntityListResponse";
import { GetJobRolesResponse } from './dto/Response/getJobRolesResponse';

import http from '../httpService';
import { UserRequest } from './dto/Request/userRequest';
import { UserOIGRequest } from './dto/Request/userOIGRequest';
import { UserOIGResponse } from './dto/Response/userOIGResponse';
import { UserByIDRequest } from './dto/Request/userByIDRequest';
import { UserByIDResponse } from './dto/Response/userByIDResponse';
import { UserEmailExistsCheckRequest } from './dto/Request/userEmailExistsCheckRequest';
import { UserLoginExistsCheckRequest } from './dto/Request/userLoginExistsCheckRequest';
import { UserImportRequest } from './dto/Request/userImportRequest';
import { UserImportResponse } from './dto/Response/userImportResponse';
import { UserBulkImportLogListResponse } from './dto/Response/userBulkImportLogListResponse';
import { SaveOIGUserRequest } from './dto/Request/saveOIGUserRequest';
import { LookupByTypeRequest } from '../dto/lookupByTypeRequest';
import { LookupByTypeResponse } from '../dto/lookupByTypeResponse';
import { UserBulkImportListRequest } from './dto/Request/userBulkImportListRequest';
import { UserBulkImportListResponse } from './dto/Response/userBulkImportListResponse';
import { UserChangePasswordRequest } from './dto/Request/userChangePasswordRequest';

var md5 = require('md5');

declare var lms: any;

class UserService {

    public async getAll(getAllUserRequest: GetAllUserRequest): Promise<PagedResultDto<GetAllUserResponse>> {
        let result = await http.post(lms.user.toAPIPath(lms.user.APIType.USERLIST), getAllUserRequest);

        var data = <PagedResultDto<GetAllUserResponse>>{};
        data.items = result.data;
        data.totalCount = (data.items.length > 0) ? data.items.length : 0;

        return data;
    }

    public async getUserById(getUserByIdRequest: UserByIDRequest): Promise<UserByIDResponse> {
        let result = await http.post(lms.user.toAPIPath(lms.user.APIType.USERDATABYID), getUserByIdRequest);
        debugger;
        return result.data;
    }

    public async getEntityList(getUserEntityListRequest: GetUserEntityListRequest): Promise<PagedResultDto<GetUserEntityListResponse>> {

        var data = <PagedResultDto<GetUserEntityListResponse>>{};
        try {
            let result = await http.get(lms.user.toAPIPath(lms.user.APIType.USERENTITYLIST), { params: getUserEntityListRequest });
            data.items = result.data;
            data.totalCount = data.items.length;
            return data;
        }
        catch (e) {
            console.log(e);
        }
        return data;
    }

    public async getJobRoles(): Promise<PagedResultDto<GetJobRolesResponse>> {
        var data = <PagedResultDto<GetJobRolesResponse>>{};
        try {
            let result = await http.get(lms.user.toAPIPath(lms.user.APIType.USERJOBCODES));
            data.items = result.data["listJobRoles"];
            data.totalCount = data.items.length;
            return data;
        }
        catch (e) {
            console.log(e);
        }
        return data;
    }

    public async create(createUserRequest: UserRequest) {
        let result = await http.post(lms.user.toAPIPath(lms.user.APIType.ADDEDITUSER), createUserRequest);
        return result.data;
    }

    public async update(editUserRequest: UserRequest) {
        let result = await http.post(lms.user.toAPIPath(lms.user.APIType.ADDEDITUSER), editUserRequest);
        return result.data;
    }

    public async checkOIG(userOIGRequest: UserOIGRequest): Promise<UserOIGResponse> {
        let result = await http.post(lms.user.toAPIPath(lms.user.APIType.CHECKOIG), userOIGRequest);
        return result.data;
    }

    public async checkIsEmailInUse(userEmailCheckRequest: UserEmailExistsCheckRequest): Promise<string> {
        let result = await http.get(lms.user.toAPIPath(lms.user.APIType.USEREMAILCHECK), { params: userEmailCheckRequest });
        return result.data;
    }

    public async checkIsLoginIdInUse(userLoginCheckRequest: UserLoginExistsCheckRequest): Promise<string> {
        let result = await http.get(lms.user.toAPIPath(lms.user.APIType.USERLOGINIDCHECK), { params: userLoginCheckRequest });
        return result.data;
    }

    //bulk upload
    public async uploadUserImport(userImportRequest: UserImportRequest): Promise<UserImportResponse> {

        let formData = new FormData();
        formData.append('uploadedFile', userImportRequest.uploadedFile, userImportRequest.uploadedFile.name);
        formData.append('requestorUserId', userImportRequest.requesterUserId);

        let result = await http.post(lms.user.toAPIPath(lms.user.APIType.USERBULKUPLOAD), formData);

        return result.data;
    }

    //download template
    public async donloadUserTemplate(): Promise<File> {

        let result = await http.get(lms.user.toAPIPath(lms.user.APIType.USEREXCELTEMPLATE), { responseType: 'arraybuffer' });
        return result.data;
    }

    public async getUserBulkImportLog(bulkImportId: string): Promise<PagedResultDto<UserBulkImportLogListResponse>> {
        debugger;
        var data = <PagedResultDto<UserBulkImportLogListResponse>>{};
        try {
            let result = await http.get(lms.user.toAPIPath(lms.user.APIType.USERBULKIMPORTLOGRESPONSE), { params: { BulkImportId: bulkImportId } });
            data.items = result.data;
            data.totalCount = data.items.length;
            return data;
        }
        catch (e) {
            console.log(e);
        }
        return data;
    }

    public async saveOIGUser(saveOIGUserRequest: SaveOIGUserRequest) {

        let result = await http.post(lms.user.toAPIPath(lms.user.APIType.SAVEOIGUSERS), saveOIGUserRequest);
        return result.data;
    }

    public async getBulkImportStatus(lookupByTypeRequest: LookupByTypeRequest): Promise<PagedResultDto<LookupByTypeResponse>> {
       
        var data = <PagedResultDto<LookupByTypeResponse>>{};
        try {
            var URL = lms.user.toAPIPath(lms.user.APIType.USERBULKIMPORTSTATUS) + '?' + 'LookupType=' + lookupByTypeRequest.LookupType
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

    public async getAllBulkImportHistory(userBulkImportListRequest: UserBulkImportListRequest): Promise<PagedResultDto<UserBulkImportListResponse>> {

        var data = <PagedResultDto<UserBulkImportListResponse>>{};
        try {
            let result = await http.post(lms.user.toAPIPath(lms.user.APIType.USERBULKIMPORTLSTALL), userBulkImportListRequest);
            data.items = result.data;
            data.totalCount = data.items.length;
            return data;
        }
        catch (e) {
            console.log(e);
        }
        return data;
    }

    //download bulk uploaded file
    public async downloadBulkUploadedFile(bulkImportId: string): Promise<File> {

        let result = await http.get(lms.user.toAPIPath(lms.user.APIType.GETBULKIMPORTUPLOADEDFILE), { params: { 'BulkImportId': bulkImportId }, responseType: 'arraybuffer' });
        return result.data;
    }

    public async changePassword(userChangePasswordRequest: UserChangePasswordRequest): Promise<string> {

        //hash password
        if (userChangePasswordRequest.password !== '') {

            var password = userChangePasswordRequest.password;
            var hash = md5(password);
            userChangePasswordRequest.password = hash;
        }

        //hash current password
        if (userChangePasswordRequest.currentPassword !== '') {

            var password = userChangePasswordRequest.currentPassword;
            var hash = md5(password);
            userChangePasswordRequest.currentPassword = hash;
        }

        let result = await http.post(lms.user.toAPIPath(lms.user.APIType.USERCHANGEPWD), userChangePasswordRequest);
        return result.data;
    }

    //export user data
    public async exportUserData(getAllUserRequest: GetAllUserRequest): Promise<File> {

        let result = await http.post(lms.user.toAPIPath(lms.user.APIType.EXPORTUSERDATA), getAllUserRequest, { responseType: 'arraybuffer' });
        return result.data;
    }
}

export default new UserService();
