import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs';
import { UserService } from '../user-service/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private userService: UserService, public jwtHelper: JwtHelperService) {}

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
        localStorage.setItem('access_token', response.accessToken);
      })
    )
  }
}
