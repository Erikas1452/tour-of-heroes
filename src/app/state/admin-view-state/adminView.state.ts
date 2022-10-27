import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { patch, updateItem } from '@ngxs/store/operators';
import { tap } from 'rxjs';
import { User } from 'src/app/common/user';
import { UserRolesService } from 'src/app/services/user-roles-service/user-roles.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { FetchUsers, UpdateUserRole } from './adminView.actions';
import { AdminViewStateModel } from './adminViewState.model';

@State<AdminViewStateModel>({
  name: 'AdminState',
  defaults: {
    users: [],
  },
})
@Injectable()
export class AdminViewState {
  constructor(private _userService: UserService, private _userRolesService: UserRolesService) {}

  @Selector()
  static selectUsers(state: AdminViewStateModel) {
    return state.users;
  }

  @Action(UpdateUserRole)
  updateUserRole(ctx: StateContext<AdminViewStateModel>, action: UpdateUserRole) {
    const state = ctx.getState();
    const updatedUser: User = {...action.user, role: action.role};
    return this._userRolesService.updateUserRole(action.user.id, action.role, action.user.email).pipe(
      tap((response: any) => {
        console.log(response);
        ctx.setState(
          patch<AdminViewStateModel>({
            users: updateItem<User>(
              user => user?.id === action.user.id,
              updatedUser
            ),
          })
        );
      })
    );
  }

  @Action(FetchUsers)
  fetchUsers(ctx: StateContext<AdminViewStateModel>, action: FetchUsers) {
    const state = ctx.getState();
    return this._userService.getUsers().pipe(
      tap((response: any) => {
        ctx.setState({
          users: response
        });
      })
    );
  }
}
