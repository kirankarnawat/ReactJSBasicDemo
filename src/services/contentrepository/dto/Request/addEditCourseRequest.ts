
export interface AddEditCourseRequest {

    courseId: string,
    courseName: string,
    courseDescription: string,
    coursePrice: number,
    courseDurationHH: number,
    courseDurationMM: number,
    showCourseHeaderImage: boolean,
    courseHeaderImage: string,
    isPrintCertificate: boolean,
    isInCatalog: boolean,
    launchPreference: string,
    windowSizeHeight: number,
    windowSizeWidth: number,
    expiryDate: Date,
    status: boolean,
    courseCategoryId: string,
    courseUniqueId: number,
    pageIndex: number,
    pageSize: number,
    sortExp: string,
    requesterUserId: string
}