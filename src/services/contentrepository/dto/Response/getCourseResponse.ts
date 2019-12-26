
export interface GetCourseResponse {

    courseId: string,
    courseName: string,
    courseDescription: string,
    courseDurationHH: number ,
    courseDurationMM: number ,
    status: boolean,
    uploadedFile: File ,
    requesterUserId: string,
    launchPreference: string,
    windowSizeHeight: number ,
    windowSizeWidth: number ,
    isPrintCertificate: boolean,
    isCreditRating: boolean,
    isInCatalog: boolean,
    showCourseHeaderImage: boolean,
    courseHeaderImage: string,
    headerImage: File ,
    expiryDate: Date ,
    coursePrice: number ,
    courseCategoryId: string
}