export interface AuthenticationResultModel {
    token: string;
    userId: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    isSuccess: boolean;
    expireInSeconds: number;
}
