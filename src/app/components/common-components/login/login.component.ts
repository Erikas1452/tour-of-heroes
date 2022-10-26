import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  @Input() public adminMode: boolean = false;
  @Output() private onLogin = new EventEmitter();

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

  public ngOnInit(): void {}

  public login() {
    if (this.loginFormGroup.valid) {
      console.log("EMITING");
      this.onLogin.emit(this.loginFormGroup.value);
    } else {
      this._snackBarHandler.openSnackBar("Form is not valid");
    }
  }
}