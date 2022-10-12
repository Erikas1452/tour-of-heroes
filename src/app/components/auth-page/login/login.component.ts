import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngxs/store';
import { SnackbarHandler } from 'src/app/common/SnackBarHandler';
import { LoginUser } from 'src/app/state/user-state/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public emailControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
    Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
  ]);
  public passwordControl: FormControl = new FormControl('', [
    Validators.required,
  ]);
  public loginFormGroup!: FormGroup;

  constructor(
    private store: Store,
    private _formBuilder: FormBuilder,
    private _snackBarHandler: SnackbarHandler
  ) {
    this.loginFormGroup = this._formBuilder.group({
      email: this.emailControl,
      password: this.passwordControl,
    });
  }

  ngOnInit(): void {}

  login() {
    if (this.emailControl.valid) {
      this.store.dispatch(
        new LoginUser(
          this.loginFormGroup.value.email,
          this.loginFormGroup.value.password
        )
      );
    } else {
      this._snackBarHandler.openSnackBar("Form is not valid");
    }
  }
}
