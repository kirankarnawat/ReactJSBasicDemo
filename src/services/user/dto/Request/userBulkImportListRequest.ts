import { PagedFilterAndSortedRequest } from '../../../dto/pagedFilterAndSortedRequest';

export interface UserBulkImportListRequest extends PagedFilterAndSortedRequest {
    importStatus: string,
    requesterUserId: string
}