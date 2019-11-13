import { CreateOrUpdateUserInput } from './dto/createOrUpdateUserInput';
import { EntityDto } from '../../services/dto/entityDto';


import { PagedResultDto } from '../../services/dto/pagedResultDto';
import { GetAllUserRequest } from "./dto/Request/getAllUserRequest";
import { GetAllUserResponse } from "./dto/Response/getAllUserResponse";

import { GetRoles } from './dto/getRolesOuput';

import http from '../httpService';

declare var lms: any;

class UserService {
    public async create(createUserInput: CreateOrUpdateUserInput) {
        let result = await http.post('api/services/app/User/Create', createUserInput);
        return result.data.result;
    }

    public async update(getAllUserRequest: GetAllUserRequest) {
        //let result = await http.put('api/services/app/User/Update', updateUserInput);
        //return result.data;
    }

    public async delete(entityDto: EntityDto) {
        let result = await http.delete('api/services/app/User/Delete', { params: entityDto });
        return result.data;
    }

    public async getRoles() {
        //let result = await http.get('api/services/app/User/GetRoles');
        //return result.data.result.items;

        var result: GetRoles[] = [
            { "id": 1, "name": "HOD", "description": "handles department" },
            { "id": 2, "name": "Lead", "description": "handles team" },
        ];
        return result;
    }

    public async get(entityDto: EntityDto): Promise<CreateOrUpdateUserInput> {
        //let result = await http.get('api/services/app/User/Get', { params: entityDto });
        //return result.data.result;

        var data = <CreateOrUpdateUserInput>{};
        if (entityDto.id == 1)
            data = { "id": 1, "firstName": "Amit", "lastName": "Dhivar", "userType": "Head", "department": "IT", "emailAddress": "amit.dhivar@deplhianlogic.com", "isActive": true, "password": "P@ssw0rd", "roleNames": ["HOD"] };
        else
            data = { "id": 2, "firstName": "Rajesh", "lastName": "Deshpande", "userType": "Lead", "department": "IT", "emailAddress": "rajesh.deshpande@delphianlogic.com", "isActive": true, "password": "P@ssw0rd", "roleNames": ["LEAD"] };
        var result = data;
        return result;
    }

    public async getAll(getAllUserRequest: GetAllUserRequest): Promise<PagedResultDto<GetAllUserResponse>> {
        debugger;
        let result = await http.post(lms.toAPIPath(lms.APIType.USERLIST), getAllUserRequest);

        var data = <PagedResultDto<GetAllUserResponse>>{};
        data.items = result.data;
        data.totalCount = data.items.length;

        return data;
    }
}

export default new UserService();
