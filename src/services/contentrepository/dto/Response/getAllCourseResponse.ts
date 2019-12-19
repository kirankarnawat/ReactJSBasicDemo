
export interface GetAllCourseResponse {

    CourseId: string,
    CourseName: string,
    CourseDescription: string,
    CoursePrice: number,
    CourseDurationHH: number,
    CourseDurationMM: number,
    Status: boolean | null,
    DisplayStatus: string,
    CourseUploadSuccess: boolean | null,
    CreatedDate: Date,
    CreatedDateDisplay: string,
    CourseCategoryName: string
}
