import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { matchValidator } from '../common/functions';
import { UserService } from '../services/user-service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public usernameControl: FormControl = new FormControl('', [
    Validators.required,
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
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.registerFormGroup = this._formBuilder.group(
      {
        username: this.usernameControl,
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

  register() {
    this.userService
      .register(
        this.registerFormGroup.value.username,
        this.registerFormGroup.value.password
      )
      .subscribe(
        (res) => console.log(res),
      );
  }
}
