import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Input,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { identicalHashValidator } from '../common/functions';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css'],
})
export class HeroFormComponent implements OnInit {
  @Output() private onFormSubmit = new EventEmitter();
  @Input() public hero?: Hero;
  @Input() public buttonText!: string;
  @Input() public title?: string;

  public addOnBlur: boolean = true;
  public readonly separatorKeysCodes = [ENTER, COMMA] as const;
  public hashtags: string[] = [];

  public nameControl: FormControl = new FormControl('', [Validators.required]);
  public levelControl: FormControl = new FormControl('', [Validators.required]);
  public companyControl: FormControl = new FormControl('', [Validators.required]);
  public descriptionControl: FormControl = new FormControl('', [Validators.required]);
  public hashtagControl: FormControl = new FormControl([],[identicalHashValidator(this.hashtags)]);

  public heroFormGroup: FormGroup = this._formBuilder.group({
    name: this.nameControl,
    level: this.levelControl,
    companyType: this.companyControl,
    description: this.descriptionControl,
    hashtags: this.hashtagControl,
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['hero']) {
      this.nameControl.setValue(changes['hero'].currentValue.name);
      this.levelControl.setValue(changes['hero'].currentValue.level);
      this.companyControl.setValue(changes['hero'].currentValue.companyType);
      this.descriptionControl.setValue(
        changes['hero'].currentValue.description
      );
      this.hashtagControl.setValue(changes['hero'].currentValue.hashtags);
      if (changes['hero'].currentValue.hashtags)
        this.hashtags = changes['hero'].currentValue.hashtags;
      this.hashtagControl.setValidators([
        identicalHashValidator(this.hashtags),
      ]);
    }
  }

  public ngOnInit(): void {}

  public sendForm(): void {
    if (this.heroFormGroup.valid){
      this.onFormSubmit.emit(this.heroFormGroup.value);
      // this.heroFormGroup.reset();
      // this.heroFormGroup.markAsPristine();
      // this.heroFormGroup.markAsUntouched();
      // this.resetForm(this.heroFormGroup);
    }
    else this.openSnackBar();
  }

  // private resetForm(formGroup: FormGroup) {
  //   let control!: AbstractControl;
  //   formGroup.reset();
  //   formGroup.markAsUntouched();
  //   Object.keys(formGroup.controls).forEach((name) => {
  //     control = formGroup.controls[name];
  //     control.setErrors(null);
  //   });
  // }

  private openSnackBar(): void {
    this._snackBar.open('Form is not valid', 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  public addChip(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.hashtags.push(value);
      this.hashtagControl.setValue(this.hashtags);
    }
    event.chipInput!.clear();
  }

  public removeChip(value: string): void {
    const index = this.hashtags.indexOf(value);
    if (index >= 0) {
      this.hashtags.splice(index, 1);
      this.hashtagControl.setValue(this.hashtags);
    }
  }
}
