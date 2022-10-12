import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { matchValidator } from 'src/app/common/functions';
import { RegisterUser } from 'src/app/state/user-state/user.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public emailControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
    Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
  ]);
  public passwordControl: FormControl = new FormControl('', [
    Validators.required,
  ]);
  public confirmPasswordControl: FormControl = new FormControl('', [
    Validators.required,
  ]);
  public registerFormGroup!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private store: Store,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.registerFormGroup = this._formBuilder.group(
      {
        email: this.emailControl,
        password: this.passwordControl,
        confirmPassword: this.confirmPasswordControl,
      },
      {
        validators: matchValidator('password', 'confirmPassword'),
      }
    );
  }
  get passwordMatchError() {
    return (
      this.registerFormGroup.getError('mismatch') &&
      this.registerFormGroup.get('confirmPassword')?.touched
    );
  }

  private openSnackBar(): void {
    this._snackBar.open('Form is not valid', 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  register() {
    if(this.registerFormGroup.valid)
    {
      this.store
      .dispatch(
        new RegisterUser(
          this.registerFormGroup.value.email,
          this.registerFormGroup.value.password
        )
      );
    }
    else
    {
      this.openSnackBar();
    }
  }
}
