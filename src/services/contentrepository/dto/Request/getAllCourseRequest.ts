
import { PagedFilterAndSortedRequest } from '../../../dto/pagedFilterAndSortedRequest';

export interface GetAllCourseRequest extends PagedFilterAndSortedRequest {

    courseName: string,
    courseDescription: string,
    status: boolean,
    courseCategoryId: string,
    requesterUserId: string
}