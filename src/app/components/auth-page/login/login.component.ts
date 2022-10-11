import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngxs/store';
import { LoginUser } from 'src/app/state/user-state/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public usernameControl: FormControl = new FormControl('', [
    Validators.required,
  ]);
  public passwordControl: FormControl = new FormControl('', [
    Validators.required,
  ]);
  public loginFormGroup!: FormGroup;

  constructor(
    private store: Store,
    private _formBuilder: FormBuilder,
  ) {
    this.loginFormGroup = this._formBuilder.group({
      username: this.usernameControl,
      password: this.passwordControl,
    });
  }

  ngOnInit(): void {}

  login() {
    this.store
      .dispatch(
        new LoginUser(
          this.loginFormGroup.value.username,
          this.loginFormGroup.value.password
        )
      );
  }
}
