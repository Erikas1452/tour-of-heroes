import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
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
    private _snackBar: MatSnackBar
  ) {
    this.loginFormGroup = this._formBuilder.group({
      email: this.emailControl,
      password: this.passwordControl,
    });
  }

  ngOnInit(): void {}

  private openSnackBar(): void {
    this._snackBar.open('Form is not valid', 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  login() {
    if (this.emailControl.valid) {
      this.store.dispatch(
        new LoginUser(
          this.loginFormGroup.value.email,
          this.loginFormGroup.value.password
        )
      );
    } else {
      this.openSnackBar();
    }
  }
}
