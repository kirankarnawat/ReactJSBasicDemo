export interface GetAllUserOutput {
    id: number;
    firstName: string;
    lastName: string;
    userType: string;
    department: string;
    emailAddress: string;
    isActive: boolean;
    roleNames: string[];
}
