export class LoginUser {
    static readonly type = '[User API] Get User';
    constructor(public username: string, public password: string){}
}

export class LogoutUser{
    static readonly type = '[User API] Logout User';
}