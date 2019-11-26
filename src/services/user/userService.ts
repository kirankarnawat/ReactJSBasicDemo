import { EntityDto } from '../../services/dto/entityDto';
import { PagedResultDto } from '../../services/dto/pagedResultDto';
import { GetAllUserRequest } from "./dto/Request/getAllUserRequest";
import { GetAllUserResponse } from "./dto/Response/getAllUserResponse";
import { GetUserEntityListRequest } from "./dto/Request/getUserEntityListRequest";
import { GetUserEntityListResponse } from "./dto/Response/getUserEntityListResponse";
import { GetJobRolesResponse } from './dto/Response/getJobRolesResponse';

import http from '../httpService';
import { UserRequest } from './dto/Request/userRequest';

declare var lms: any;

class UserService {

    public async getAll(getAllUserRequest: GetAllUserRequest): Promise<PagedResultDto<GetAllUserResponse>> {
        let result = await http.post(lms.toAPIPath(lms.APIType.USERLIST), getAllUserRequest);

        var data = <PagedResultDto<GetAllUserResponse>>{};
        data.items = result.data;
        data.totalCount = (data.items.length > 0) ? data.items[0].totalCount : 0;

        return data;
    }

    public async getEntityList(getUserEntityListRequest: GetUserEntityListRequest): Promise<PagedResultDto<GetUserEntityListResponse>> {
        debugger;
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

    public async create(createUserInput: UserRequest) {
        debugger;
        let result = await http.post(lms.toAPIPath(lms.APIType.ADDEDITUSER), createUserInput);
        return result.data;
    }

    public async update(getAllUserRequest: GetAllUserRequest) {
        //let result = await http.put('api/services/app/User/Update', updateUserInput);
        //return result.data;
    }

    public async delete(entityDto: EntityDto) {
        let result = await http.delete('api/services/app/User/Delete', { params: entityDto });
        return result.data;
    }
}

export default new UserService();
