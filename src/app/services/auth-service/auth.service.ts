import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, tap } from 'rxjs';
import { UserService } from '../user-service/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private userService: UserService, public jwtHelper: JwtHelperService, public router: Router) {}

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    if(token === null) return false;
    return !this.jwtHelper.isTokenExpired(token);
  }

  logout(){
    localStorage.removeItem("access_token");
    this.router.navigate(['login']);
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
