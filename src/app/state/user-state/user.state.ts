import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UserStateModel } from './userState.model';
import { Injectable, NgZone} from '@angular/core';
import { MessageService } from 'src/app/services/message-service/message.service';
import { LoginUser, LogoutUser } from './user.actions';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/common/user';

@State<UserStateModel>({
  name: 'UserState',
  defaults: {
    id: undefined,
    email: undefined,
  },
})
@Injectable()
export class UserState {
  constructor(private authService: AuthService, private router: Router, private ngZone: NgZone) {}

  @Selector()
  static selectUser(state: UserStateModel) {
    return {id: state.id, email: state.email} as User;
  }

  @Action(LogoutUser)
  logoutUser(ctx: StateContext<UserStateModel>, action: LogoutUser) {
    this.authService.logout();
    this.ngZone.run(()=>this.router.navigate(['login']));
    return ctx.setState({id: undefined, email: undefined });
  }

  @Action(LoginUser)
  loginUser(ctx: StateContext<UserStateModel>, action: LoginUser) {
    const state = ctx.getState();
    return this.authService.userLogin(action.username, action.password).pipe(
      tap((response: any) => {
        ctx.setState({
          ...state,
          id: response.user.id,
          email: response.user.email,
        });
        this.ngZone.run(()=>this.router.navigate(['dashboard']));
      })
    );
  }
}
