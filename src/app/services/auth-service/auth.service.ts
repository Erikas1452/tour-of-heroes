import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, tap } from 'rxjs';
import { ErrorHandler } from 'src/app/common/ErrorHandler';
import { Role } from 'src/app/common/role';
import { SnackbarHandler } from 'src/app/common/SnackBarHandler';
import { UserService } from '../user-service/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public adminLogin(username: string, password: string) {
    return this.userService.login(username, password).pipe(
      tap((response) => {
        if (response.user.role !== Role.Admin) {
          this._snackbarHandler.openSnackBar('Only Admin is allowed to access this');
          throw new Error('Only Admin is allowed to access this');
        }
        localStorage.setItem('access_token', response.accessToken);
      })
    );
  }

  constructor(
    private _snackbarHandler: SnackbarHandler, 
    private userService: UserService,
    public jwtHelper: JwtHelperService
  ) {}

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    if(token === null) return false;
    return !this.jwtHelper.isTokenExpired(token);
  }

  public getToken(){
    return localStorage.getItem('access_token');
  }

  public logout(){
    localStorage.removeItem("access_token");
  }

  public userLogin(username: string, password: string) {
    return this.userService.login(username, password).pipe(
      tap((response) => {
        if (response.user.role !== Role.Visitor && response.user.role !== Role.User) {
          this._snackbarHandler.openSnackBar('Only regular users and visitors are allowed to access this');
          throw new Error('Only regular users and visitors are allowed to access this');
        }
        localStorage.setItem('access_token', response.accessToken);
      })
    );
  }
}
