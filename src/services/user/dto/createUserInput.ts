export interface CreateUserInput {
    firstName: string;
    lastName: string;
    userType: string;
    department: string;
    emailAddress: string;
    isActive: boolean;
    roleNames: string[];
    password: string;
}
