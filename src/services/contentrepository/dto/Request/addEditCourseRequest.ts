import { CourseKeywordResponse } from '../Response/courseKeywordResponse';

export interface AddEditCourseRequest {

    courseId: string,
    courseName: string,
    courseDescription: string,
    coursePrice: number | null,
    courseDurationHH: number,
    courseDurationMM: number,
    showCourseHeaderImage: boolean,
    courseHeaderImage: string,
    isPrintCertificate: boolean,
    isInCatalog: boolean,
    launchPreference: string,
    windowSizeHeight: number,
    windowSizeWidth: number,
    expiryDate: Date | null,
    status: boolean,
    courseCategoryId: string,
    courseUniqueId: number,    
    requesterUserId: string,
    listCourseMasterKeyWord: CourseKeywordResponse[],
}