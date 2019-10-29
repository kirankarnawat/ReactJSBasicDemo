export interface UpdateUserOutput {
    id: number;
    firstName: string;
    lastName: string;
    userType: string;
    department: string;
    emailAddress: string;
    isActive: boolean;
    roleNames: string[];
    lastLoginTime?: any;
    creationTime: Date;
}
