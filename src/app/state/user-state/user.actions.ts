export class LoginUser {
    static readonly type = '[User API] Login User';
    constructor(public username: string, public password: string){};
}

export class LoginAdmin {
    static readonly type = '[User API] Login Admin';
    constructor(public username: string, public password: string){};
}

export class RegisterUser {
    static readonly type = '[User API] Register User';
    constructor(public username: string, public password:string){};
}

export class LogoutUser{
    static readonly type = '[User API] Logout User';
}