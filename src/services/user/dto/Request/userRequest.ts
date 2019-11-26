
export interface UserRequest {
    userId: string,
    firstName: string,
    lastName: string,
    emailAddress: string,
    loginId: string,
    contactNumber: string,
    hiringDate: Date | null,
    zipCode: string,
    status: true,
    departmentId: string,
    jobCodeId: string,
    roleChangeDate: Date | null,
    timeZoneId: string,
    profilePic: string,
    groupId: string,
    countryId: string,
    stateId: string,
    cityId: string,
    requesterUserId: string
}