import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { UserService } from '../user-service/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private userService: UserService) {
    const token = localStorage.getItem('access_token');
    this._isLoggedIn$.next(!!token);
  }

  userRegister() {}

  userLogin(username: string, password: string) {
    return this.userService.login(username, password).pipe(
      tap((response) => {
        console.log(response);
        localStorage.setItem('access_token', response.accessToken);
        this._isLoggedIn$.next(true);
      })
    )
  }
}
