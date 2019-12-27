import { CourseKeywordResponse } from './courseKeywordResponse';

export interface GetCourseResponse {

    courseId: string,
    courseName: string,
    courseDescription: string,
    courseDurationHH: number,
    courseDurationMM: number,
    status: boolean,
    uploadedFile: File,
    requesterUserId: string,
    launchPreference: string,
    windowSizeHeight: number,
    windowSizeWidth: number,
    isPrintCertificate: boolean,
    isCreditRating: boolean,
    isInCatalog: boolean,
    showCourseHeaderImage: boolean,
    courseHeaderImage: string,
    courseCategoryId: string,
    courseUniqueId: number,
    coursePrice: number,
    headerImage: File,
    expiryDate: Date,
    listCourseMasterKeyWord: CourseKeywordResponse[]
}