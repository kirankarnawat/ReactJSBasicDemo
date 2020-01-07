
export interface SystemUserRequest {

    searchOnGroupId: string,
    firstName: string;
    groupId: string,
    requesterUserId: string,
    noPaging: boolean;
    status: boolean;
}