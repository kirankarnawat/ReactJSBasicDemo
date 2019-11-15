import { PagedFilterAndSortedRequest } from '../../../dto/pagedFilterAndSortedRequest';

export interface GetAllUserRequest extends PagedFilterAndSortedRequest {
    emailAddress: string,
	firstName: string,
    lastName: string,
    searchOnGroupId: string,
    groupId: string,
    requesterUserId: string,
    departmentId: string,
    jobCodeId: string,
    status: boolean | null,
    hiringDateFrom: Date | null,
    hiringDateTo: Date | null,
    roleChangeDateFrom: Date | null,
    roleChangeDateTo: Date | null,
}
