
export interface GetAllCourseResponse {

    courseId: string,
    courseName: string,
    courseDescription: string,
    coursePrice: number,
    courseDurationHH: number,
    courseDurationMM: number,
    status: boolean,
    courseCategoryId: string,
    courseCategoryName: string,
    createdDate: Date,
    lastModifiedDate: Date,
    totalCount: number,
    createdDateDisplay: string,
    lastModifiedDateDisplay: string
}
