import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service/auth.service';

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
    private router: Router,
    private _formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.loginFormGroup = this._formBuilder.group({
      username: this.usernameControl,
      password: this.passwordControl,
    });
  }

  ngOnInit(): void {}

  login() {
    this.authService
      .userLogin(
        this.loginFormGroup.value.username,
        this.loginFormGroup.value.password
      )
      .subscribe(
        (res) => {
          this.router.navigate(['dashboard']);
        }
      );
      
  }
}
