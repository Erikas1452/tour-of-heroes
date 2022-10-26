import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { UserService } from 'src/app/services/user-service/user.service';
import { FetchUsers } from './adminView.actions';
import { AdminViewStateModel } from './adminViewState.model';

@State<AdminViewStateModel>({
  name: 'AdminState',
  defaults: {
    users: [],
  },
})
@Injectable()
export class AdminViewState {
  constructor(private _userService: UserService) {}

  @Selector()
  static selectUsers(state: AdminViewStateModel) {
    return state.users;
  }

  @Action(FetchUsers)
  fetchUsers(ctx: StateContext<AdminViewStateModel>, action: FetchUsers) {
    const state = ctx.getState();
    return this._userService.getUsers().pipe(
      tap((response: any) => {
        console.log(response);
        ctx.setState({
          users: response
        });
      })
    );
  }
}
