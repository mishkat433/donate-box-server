import { USER_ROLE } from "../../../enums/userEnums";


export type IUserLogin = {
    password: string;
    phoneNumber: string;
    role: USER_ROLE;
}

export type IUserAdminLoginResponse = {
    access_token: string;
    refresh_token?: string;
}