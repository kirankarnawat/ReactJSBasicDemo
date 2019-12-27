
import http from '../httpService';
import { ContentRepositoryCountResponse } from './dto/Response/contentRepositoryCountResponse';
import { GetAllCourseRequest } from './dto/Request/getAllCourseRequest';
import { GetAllCourseResponse } from './dto/Response/getAllCourseResponse';
import { PagedResultDto } from '../dto/pagedResultDto';
import { GetCourseRequest } from './dto/Request/getCourseRequest';
import { GetCourseResponse } from './dto/Response/getCourseResponse';
import { CourseNameExistsCheckRequest } from './dto/Request/courseNameExistsCheckRequest';
import { UploadCourseRequest } from './dto/Request/uploadCourseRequest';
import { UploadCourseResponse } from './dto/Response/uploadCourseResponse';
import { AddEditCourseRequest } from './dto/Request/addEditCourseRequest';
import { CourseKeywordExistsCheckRequest } from './dto/Request/courseKeywordExistsCheckRequest';
import { AddCourseKeywordRequest } from './dto/Request/addCourseKeywordRequest';
import { EntityDto } from '../dto/entityDto';

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

    public async getCourseCategory(): Promise<string> {
        var data = '';
        try {
            let result = await http.get(lms.course.toAPIPath(lms.course.APIType.GETCOURSELOOKUPS));
            data = JSON.stringify(result.data);
        }
        catch (e) {
            console.log(e);
        }
        return data;
    }

    public async getCourse(getCourseRequest: GetCourseRequest): Promise<GetCourseResponse> {
        debugger;
        let result = await http.get(lms.course.toAPIPath(lms.course.APIType.GETCOURSE), { params: getCourseRequest });
        return result.data;
    }

    public async checkIsCourseNameInUse(courseNameCheckRequest: CourseNameExistsCheckRequest): Promise<string> {

        let result = await http.get(lms.course.toAPIPath(lms.course.APIType.ISCOURSENAMEINUSE), { params: courseNameCheckRequest });
        return result.data;
    }

    public async uploadCourse(uploadCourseRequest: UploadCourseRequest): Promise<UploadCourseResponse> {
        
        var data = <UploadCourseResponse>{};

        let formData = new FormData();

        if (uploadCourseRequest.uploadedFile !== null) {
            formData.append('uploadedFile', uploadCourseRequest.uploadedFile, uploadCourseRequest.uploadedFile.name);
        }
        
        if (uploadCourseRequest.uploadedHeaderImage !== null) {
            formData.append('uploadedHeaderImage', uploadCourseRequest.uploadedHeaderImage, uploadCourseRequest.uploadedHeaderImage.name);
        }

        formData.append('courseId', uploadCourseRequest.courseId);

        let result = await http.post(lms.course.toAPIPath(lms.course.APIType.UPLOADCOURSE), formData);
        data = result.data;

        return data;
    }

    public async addeditCourse(addeditCourseRequest: AddEditCourseRequest): Promise<string> {
        
        let result = await http.post(lms.course.toAPIPath(lms.course.APIType.ADDEDITCOURSE), addeditCourseRequest);

        return result.data;
    }

    public async checkIsCourseKeywordInUse(courseKeywordExistsCheckRequest: CourseKeywordExistsCheckRequest): Promise<string> {

        let result = await http.get(lms.course.toAPIPath(lms.course.APIType.ISCOURSEKEYWORDINUSE), { params: courseKeywordExistsCheckRequest });

        return result.data;
    }

    public async addCourseKeyword(addCourseKeywordRequest: AddCourseKeywordRequest): Promise<string> {

        let result = await http.post(lms.course.toAPIPath(lms.course.APIType.ADDCOURSEKEYWORD), addCourseKeywordRequest);

        return result.data;
    }

    public async removeCourseKeyword(entityDto: EntityDto): Promise<string> {
        debugger;
        var data = '';
        try {
            var URL = lms.course.toAPIPath(lms.course.APIType.DELCOURSEKEYWORD) + '?' + 'CourseKeyWordId=' + entityDto.id
            let result = await http.post(URL);
            data = (result.status === 200) ? entityDto.id : '';
        }
        catch (e) {
            data = e;
        }

        return data;
    }
}

export default new ContentRepositoryService();
