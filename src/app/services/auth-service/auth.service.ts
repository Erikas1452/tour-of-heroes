import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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

  getToken(){
    return localStorage.getItem('access_token');
  }

  logout(){
    localStorage.removeItem("access_token");
  }

  userLogin(username: string, password: string) {
    return this.userService.login(username, password).pipe(
      tap((response) => {
        console.log(response);
        localStorage.setItem('access_token', response.accessToken);
      })
    )
  }
}
