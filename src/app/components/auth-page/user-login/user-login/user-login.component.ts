import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { LoginUser } from 'src/app/state/user-state/user.actions';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  sendUserLoginRequest(event: any) {
    this.store.dispatch(
      new LoginUser(
        event.email,
        event.password
      )
    );
  }
}
