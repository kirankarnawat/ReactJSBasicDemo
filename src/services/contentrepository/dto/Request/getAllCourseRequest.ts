
export interface GetAllCourseRequest {

    courseName: string,
    courseDescription: string,
    status: boolean,
    courseCategoryId: string,
    pageIndex: number,
    pageSize: number,
    sortExp: string,
    requesterUserId: string
}