export interface CreateUserOutputItem {
    firstName: string;
    lastName: string;
    userType: string;
    department: string;
    emailAddress: string;
    isActive: boolean;
    lastLoginTime?: any;
    creationTime: Date;
    roleNames: string[];
    id: number;
}

export interface CreateUserOutput {
    result: CreateUserOutputItem;
}
