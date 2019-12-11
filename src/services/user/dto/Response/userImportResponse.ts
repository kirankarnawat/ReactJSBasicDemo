
export interface UserImportResponse {

    BulkImportId: string,
    BulkImportFileName: string,
    ImportStatus: string,
    ImportDate: Date | null,
    CreatedDate: Date | null,
    UploadDateDisplay: string,
    ImportDateDisplay: string,
    TotalRecords: number,
    InsertedRecords: number,
    ErrorRecords: number,
    BulkImportErrorDescription: string,
    OIGRecords: number,
    CreatorName: string,
}