
export interface UserBulkImportLogListResponse {

    BulkImportLogId: string,
    BulkImportError: string,
    EmailAddress: string,
    FirstName: string,
    LastName: string,
    HiringDate: Date | null,
    JobCodeId: string,
    IsOIGError: boolean,
    IsUserAdded: boolean,
    BulkImportFileName: string,
    ImportDate: Date,
    RowNo: number
}