import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, EventEmitter, OnInit, Output, Input, ViewChild} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { identicalHashValidator } from 'src/app/common/functions';
import { Hero } from 'src/app/common/hero';
import { SnackbarHandler } from 'src/app/common/SnackBarHandler';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss'],
})
export class HeroFormComponent implements OnInit {
  @Output() private onFormSubmit = new EventEmitter();
  @Input() public buttonText!: string;
  @Input() public title?: string;
  @Input() public editEnabled: boolean = false;
  @Input() public heroId!: number;
  @Input() public hero?: Hero;

  public addOnBlur: boolean = true;
  public readonly separatorKeysCodes = [ENTER, COMMA] as const;
  public hashtags: string[] = [];
  @ViewChild('heroForm') heroForm: any;

  public nameControl!: FormControl;
  public levelControl!: FormControl;
  public companyControl!: FormControl;
  public descriptionControl!: FormControl;
  public hashtagControl!: FormControl;
  public heroFormGroup!: FormGroup;
  
  constructor(
    private _formBuilder: FormBuilder,
    private _snackBarHandler: SnackbarHandler,
  ) {}

  public ngOnInit(): void {
    if(this.hero){
      this.nameControl = new FormControl(this.hero.name, [Validators.required]);
      this.levelControl = new FormControl(this.hero.level, [Validators.required]);
      this.companyControl = new FormControl(this.hero.companyType, [Validators.required,]);
      this.descriptionControl = new FormControl(this.hero.description, [Validators.required,]);
      if(this.hero.hashtags){
        this.hashtags = this.hero.hashtags;
      }
      this.hashtagControl = new FormControl(this.hero.hashtags, [identicalHashValidator(this.hashtags),]);
    }
    else
    {
      this.nameControl = new FormControl('', [Validators.required]);
      this.levelControl = new FormControl('', [Validators.required]);
      this.companyControl = new FormControl('', [Validators.required,]);
      this.descriptionControl = new FormControl('', [Validators.required,]);
      this.hashtagControl = new FormControl([], [identicalHashValidator(this.hashtags),]);
    }

    this.heroFormGroup = this._formBuilder.group({
      name: this.nameControl,
      level: this.levelControl,
      companyType: this.companyControl,
      description: this.descriptionControl,
      hashtags: this.hashtagControl,
    });
  }

  public sendForm(): void {
    if (this.heroFormGroup.valid) {
      this.onFormSubmit.emit(this.heroFormGroup.value);
      if (!this.hero) {
        this.heroFormGroup.reset();
        this.hashtags = [];
        this.heroForm.resetForm();
      }
    } else this._snackBarHandler.openSnackBar("Form is not valid");
  }

  public addChip(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.hashtags = [...this.hashtags, value];
      this.hashtagControl.setValidators([identicalHashValidator(this.hashtags)]);
      this.hashtagControl.setValue(this.hashtags);
    }
    event.chipInput!.clear();
  }

  public removeChip(value: string): void {
    const index = this.hashtags.indexOf(value);
    if (index >= 0) {
      this.hashtags = [...this.hashtags];
      this.hashtags.splice(index, 1);
      this.hashtagControl.setValidators([identicalHashValidator(this.hashtags)]);
      this.hashtagControl.setValue(this.hashtags);
    }
  }
}
