
import http from '../httpService';
import { ContentRepositoryCountResponse } from './dto/Response/contentRepositoryCountResponse';

declare var lms: any;

class ContentRepositoryService {

    public async getContentRepositoryCount(requserid: string): Promise<ContentRepositoryCountResponse> {

        let result = await http.get(lms.course.toAPIPath(lms.course.APIType.CONTENTREPOSITORYCOUNT), { params: { "RequesterUserId": requserid } });
        return result.data;
    }
}

export default new ContentRepositoryService();
