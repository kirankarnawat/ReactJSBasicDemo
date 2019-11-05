import { EntityDto } from './../../dto/entityDto';

export default class UserLoginInfoDto extends EntityDto {
    firstName!: string;
    lastName!: string;
    emailAddress!: string;
    userId! : string;
}
