
export interface UserBulkImportListResponse {
    bulkImportId: string,
    bulkImportFileName: string,
    importStatus: string,
    importDate: Date | null,
    createdDate: Date | null,
    uploadDateDisplay: string,
    importDateDisplay: string,
    totalRecords: number,
    insertedRecords: number,
    errorRecords: number,
    bulkImportErrorDescription: string,
    oigRecords: number,
    isSuccess: boolean,
    totalCount: number,
    createdDateDisplay: string,
    lastModifiedDateDisplay: string
}