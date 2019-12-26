
import { PagedFilterAndSortedRequest } from '../../../dto/pagedFilterAndSortedRequest';

export interface GetCourseRequest extends PagedFilterAndSortedRequest {

    courseId: string,
    status: boolean,
    requesterUserId: string,
    creatorName: string
}