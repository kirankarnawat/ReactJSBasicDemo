export interface UpdateUserInput {
    id: number;
    firstName: string;
    lastName: string;
    userType: string;
    department: string;
    emailAddress: string;
    isActive: boolean;
    roleNames: string[];
    lastLoginTime: Date;
    creationTime: Date;
}
