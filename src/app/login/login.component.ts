import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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
  public heroFormGroup!: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.heroFormGroup = this._formBuilder.group({
      username: this.usernameControl,
      password: this.passwordControl,
    });
  }

  ngOnInit(): void {}

  login(){
    
  }
}
