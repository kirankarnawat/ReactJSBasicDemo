
import { PagedResultDto } from '../../services/dto/pagedResultDto';

import http from '../httpService';
import { GetAllUserRequest } from '../user/dto/Request/getAllUserRequest';
import { GetAllUserResponse } from '../user/dto/Response/getAllUserResponse';

declare var lms: any;

class GroupService {

    public async getAll(getAllUserRequest: GetAllUserRequest): Promise<PagedResultDto<GetAllUserResponse>> {
        let result = await http.post(lms.user.toAPIPath(lms.user.APIType.USERLIST), getAllUserRequest);

        var data = <PagedResultDto<GetAllUserResponse>>{};
        data.items = result.data;
        data.totalCount = (data.items.length > 0) ? data.items.length : 0;

        return data;
    }
    
}

export default new GroupService();
