export interface CreateOrUpdateUserInput {
    id: number;
    firstName: string;
    lastName: string;
    userType: string;
    department: string;
    emailAddress: string;
    isActive: boolean;
    password: string;
    roleNames: string[];
}
