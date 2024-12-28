import {User} from "../../../../db/entities/User";

export class LoginRsult {
    token: string
    userInfo: User
}