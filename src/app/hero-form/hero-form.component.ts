import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, EventEmitter, OnInit, Output, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { identicalHashValidator } from '../common/functions';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit {

  @Output() onFormSubmit = new EventEmitter();
  @Input () hero ?: Hero;
  @Input () buttonText !: string;
  @Input () title?: string;

  addOnBlur: boolean = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  hashtags: string[] = [];

  nameControl: FormControl = new FormControl('', [Validators.required]);
  levelControl: FormControl = new FormControl('', [Validators.required]);
  companyControl: FormControl = new FormControl('', [Validators.required]);
  descriptionControl: FormControl = new FormControl('', [Validators.required]);
  hashtagControl: FormControl = new FormControl([], [identicalHashValidator(this.hashtags)]);

  HeroFormGroup: FormGroup = this._formBuilder.group({
    name: this.nameControl,
    level: this.levelControl,
    companyType: this.companyControl,
    description: this.descriptionControl,
    hashtags: this.hashtagControl,
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    ) { }

    ngOnChanges(changes: SimpleChanges){
      
      if(changes['hero'])
      {
        this.nameControl.setValue(changes['hero'].currentValue.name);
        this.levelControl.setValue(changes['hero'].currentValue.level);
        this.companyControl.setValue(changes['hero'].currentValue.companyType);
        this.descriptionControl.setValue(changes['hero'].currentValue.description);
        this.hashtagControl.setValue(changes['hero'].currentValue.hashtags);
        if(changes['hero'].currentValue.hashtags) this.hashtags = changes['hero'].currentValue.hashtags;
        this.hashtagControl.setValidators([identicalHashValidator(this.hashtags)])
      }
    }

  ngOnInit(): void {

  }

  sendForm(){
    if(this.HeroFormGroup.valid) this.onFormSubmit.emit(this.HeroFormGroup.value)
    else this.openSnackBar(); 
  }

  openSnackBar() {
    this._snackBar.open('Form is not valid', 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  addChip(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.hashtags.push(value);
      this.hashtagControl.setValue(this.hashtags);
    }
    event.chipInput!.clear();
  }

  removeChip(value: string): void {
    const index = this.hashtags.indexOf(value);
    if (index >= 0) {
      this.hashtags.splice(index, 1);
      this.hashtagControl.setValue(this.hashtags);
    }
  }


}
