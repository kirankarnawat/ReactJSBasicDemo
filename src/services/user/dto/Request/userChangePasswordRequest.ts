
export interface UserChangePasswordRequest {
    password: string,
    currentPassword: string,
    isPasswordChanged: boolean,
    requesterUserId: string,
    userId: string,
    isAdminPasswordChangeRequest: boolean
}