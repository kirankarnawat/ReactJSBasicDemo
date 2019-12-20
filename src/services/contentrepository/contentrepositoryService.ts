
import http from '../httpService';
import { ContentRepositoryCountResponse } from './dto/Response/contentRepositoryCountResponse';
import { GetAllCourseRequest } from './dto/Request/getAllCourseRequest';
import { GetAllCourseResponse } from './dto/Response/getAllCourseResponse';
import { PagedResultDto } from '../dto/pagedResultDto';

declare var lms: any;

class ContentRepositoryService {

    public async getContentRepositoryCount(requserid: string): Promise<ContentRepositoryCountResponse> {

        let result = await http.get(lms.course.toAPIPath(lms.course.APIType.CONTENTREPOSITORYCOUNT), { params: { "RequesterUserId": requserid } });
        return result.data;
    }

    public async getAllCourses(getAllCourseRequest: GetAllCourseRequest): Promise<PagedResultDto<GetAllCourseResponse>> {

        let result = await http.post(lms.course.toAPIPath(lms.course.APIType.GETALLCOURSES), getAllCourseRequest);
        return result.data;
    }

}

export default new ContentRepositoryService();
