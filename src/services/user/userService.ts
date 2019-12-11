import { EntityDto } from '../../services/dto/entityDto';
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

declare var lms: any;

class UserService {

    public async getAll(getAllUserRequest: GetAllUserRequest): Promise<PagedResultDto<GetAllUserResponse>> {
        let result = await http.post(lms.toAPIPath(lms.APIType.USERLIST), getAllUserRequest);

        var data = <PagedResultDto<GetAllUserResponse>>{};
        data.items = result.data;
        data.totalCount = (data.items.length > 0) ? data.items[0].totalCount : 0;

        return data;
    }

    public async getUserById(getUserByIdRequest: UserByIDRequest): Promise<UserByIDResponse> {
        let result = await http.post(lms.toAPIPath(lms.APIType.USERDATABYID), getUserByIdRequest);
        debugger;
        return result.data;
    }

    public async getEntityList(getUserEntityListRequest: GetUserEntityListRequest): Promise<PagedResultDto<GetUserEntityListResponse>> {

        var data = <PagedResultDto<GetUserEntityListResponse>>{};
        try {
            let result = await http.get(lms.toAPIPath(lms.APIType.USERENTITYLIST), { params: getUserEntityListRequest });
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
            let result = await http.get(lms.toAPIPath(lms.APIType.USERJOBCODES));
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
        let result = await http.post(lms.toAPIPath(lms.APIType.ADDEDITUSER), createUserRequest);
        return result.data;
    }

    public async update(editUserRequest: UserRequest) {
        let result = await http.post(lms.toAPIPath(lms.APIType.ADDEDITUSER), editUserRequest);
        return result.data;
    }

    public async checkOIG(userOIGRequest: UserOIGRequest): Promise<UserOIGResponse> {
        let result = await http.post(lms.toAPIPath(lms.APIType.CHECKOIG), userOIGRequest);
        return result.data;
    }

    public async checkIsEmailInUse(userEmailCheckRequest: UserEmailExistsCheckRequest): Promise<string> {
        let result = await http.get(lms.toAPIPath(lms.APIType.USEREMAILCHECK), { params: userEmailCheckRequest });
        return result.data;
    }

    public async checkIsLoginIdInUse(userLoginCheckRequest: UserLoginExistsCheckRequest): Promise<string> {
        let result = await http.get(lms.toAPIPath(lms.APIType.USERLOGINIDCHECK), { params: userLoginCheckRequest });
        return result.data;
    }

    //bulk upload
    public async uploadUserImport(userImportRequest: UserImportRequest): Promise<UserImportResponse> {
        debugger;

        let formData = new FormData();
        formData.append('uploadedFile', userImportRequest.uploadedFile, userImportRequest.uploadedFile.name);
        formData.append('requestorUserId', userImportRequest.requesterUserId);

        let result = await http.post(lms.toAPIPath(lms.APIType.USERBULKUPLOAD), formData);

        return result.data;
    }

    //download template
    public async donloadUserTemplate(): Promise<File> {
        debugger;
        let result = await http.get(lms.toAPIPath(lms.APIType.USEREXCELTEMPLATE), { responseType: 'arraybuffer' });
        return result.data;
    }

    public async delete(entityDto: EntityDto) {
        let result = await http.delete('api/services/app/User/Delete', { params: entityDto });
        return result.data;
    }
}

export default new UserService();
