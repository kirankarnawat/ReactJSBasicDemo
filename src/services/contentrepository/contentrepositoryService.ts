
import http from '../httpService';
import { ContentRepositoryCountResponse } from './dto/Response/contentRepositoryCountResponse';
import { GetAllCourseRequest } from './dto/Request/getAllCourseRequest';
import { GetAllCourseResponse } from './dto/Response/getAllCourseResponse';
import { PagedResultDto } from '../dto/pagedResultDto';
import { GetCourseCategoryResponse } from './dto/Response/getCourseCategoryResponse';

declare var lms: any;

class ContentRepositoryService {

    public async getContentRepositoryCount(requserid: string): Promise<ContentRepositoryCountResponse> {

        let result = await http.get(lms.course.toAPIPath(lms.course.APIType.CONTENTREPOSITORYCOUNT), { params: { "RequesterUserId": requserid } });
        return result.data;
    }

    public async getAllCourses(getAllCourseRequest: GetAllCourseRequest): Promise<PagedResultDto<GetAllCourseResponse>> {

        let result = await http.post(lms.course.toAPIPath(lms.course.APIType.GETALLCOURSES), getAllCourseRequest);

        var data = <PagedResultDto<GetAllCourseResponse>>{};
        data.items = result.data;
        data.totalCount = (data.items.length > 0) ? data.items.length : 0;

        return data;
    }

    public async getCourseCategory(): Promise<PagedResultDto<GetCourseCategoryResponse>> {
        var data = <PagedResultDto<GetCourseCategoryResponse>>{};
        try {
            let result = await http.get(lms.course.toAPIPath(lms.course.APIType.GETCOURSELOOKUPS));
            data.items = result.data["listCourseCategory"];
            data.totalCount = data.items.length;
            return data;
        }
        catch (e) {
            console.log(e);
        }
        return data;
    }
}

export default new ContentRepositoryService();
