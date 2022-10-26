import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { LoginAdmin } from 'src/app/state/user-state/user.actions';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent implements OnInit {
  constructor(private store: Store) {}

  public ngOnInit(): void {}

  sendAdminLoginRequest(event: any) {
    this.store.dispatch(
      new LoginAdmin(
        event.email,
        event.password
      )
    );
  }
}
