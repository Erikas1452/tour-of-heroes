import { Role } from "src/app/common/role";
import { User } from "src/app/common/user";

export class FetchUsers {
    static readonly type = '[Admin API] Fetch User List';
}
export class UpdateUserRole {
    static readonly type = '[Admin API] Update User Role';
    constructor(public user: User, public role: Role){};
}
