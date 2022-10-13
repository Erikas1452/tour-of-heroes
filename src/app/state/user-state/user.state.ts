import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UserStateModel } from './userState.model';
import { Injectable, NgZone } from '@angular/core';
import { LoginUser, LogoutUser, RegisterUser } from './user.actions';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/common/user';
import { UserService } from 'src/app/services/user-service/user.service';
import { SnackbarHandler } from 'src/app/common/SnackBarHandler';

@State<UserStateModel>({
  name: 'UserState',
  defaults: {
    user: undefined
  },
})
@Injectable()
export class UserState {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private ngZone: NgZone,
    private _snackBarHandler: SnackbarHandler
  ) {}

  @Selector()
  static selectUser(state: UserStateModel) {
    return state.user;
  }

  @Action(LogoutUser)
  logoutUser(ctx: StateContext<UserStateModel>, action: LogoutUser) {
    this.authService.logout();
    this.ngZone.run(() => this.router.navigate(['login']));
    return ctx.setState({ user: undefined });
  }

  @Action(LoginUser)
  loginUser(ctx: StateContext<UserStateModel>, action: LoginUser) {
    const state = ctx.getState();
    return this.authService.userLogin(action.username, action.password).pipe(
      tap((response: any) => {
        const user: User = {id: response.user.id, email: response.user.email}
        ctx.setState({
          ...state,
          user: user
        });
        this.ngZone.run(() => this.router.navigate(['dashboard']));
      })
    );
  }

  @Action(RegisterUser)
  registerUser(ctx: StateContext<UserStateModel>, action: RegisterUser) {
    const state = ctx.getState();
    return this.userService.register(action.username, action.password).pipe(
      tap((response: any) => {
        ctx.setState({
          ...state,
        });
        if (response) {
          this._snackBarHandler.openSnackBar("Registered new user");
          this.ngZone.run(() =>
            this.router.navigate(['login'])
          );
        }
      })
    );
  }
}
