import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Input,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { identicalHashValidator } from '../common/functions';
import { Hero } from '../hero';
import { AddHashTag, DeleteHashTag, GetHero } from '../state/hero.actions';
import { HeroState } from '../state/hero.state';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css'],
})
export class HeroFormComponent implements OnInit {
  @Output() private onFormSubmit = new EventEmitter();

  @Select(HeroState.selectHero) hero$!: Observable<Hero>;
  public hero!: Hero;
  private heroSubscriber!: Subscription;

  @Input() public buttonText!: string;
  @Input() public title?: string;
  @Input() public editEnabled: boolean = false;

  public addOnBlur: boolean = true;
  public readonly separatorKeysCodes = [ENTER, COMMA] as const;
  public hashtags: string[] = [];

  @ViewChild('heroForm') heroForm: any;

  public nameControl: FormControl = new FormControl('', [Validators.required]);
  public levelControl: FormControl = new FormControl('', [Validators.required]);
  public companyControl: FormControl = new FormControl('', [Validators.required,]);
  public descriptionControl: FormControl = new FormControl('', [Validators.required,]);
  public hashtagControl: FormControl = new FormControl('', [identicalHashValidator(this.hashtags),]);

  public heroFormGroup: FormGroup = this._formBuilder.group({
    name: this.nameControl,
    level: this.levelControl,
    companyType: this.companyControl,
    description: this.descriptionControl,
    hashtags: this.hashtagControl,
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  public ngOnInit(): void {
    if(this.editEnabled){
      // const id = Number(this.route.snapshot.paramMap.get('id'));
      const id = 13;
      this.store.dispatch(new GetHero(id));
      this.heroSubscriber = this.hero$.subscribe((hero: Hero) => {
        this.hero = hero;
        this.nameControl.setValue(hero.name);
        this.levelControl.setValue(hero.level);
        this.companyControl.setValue(hero.companyType);
        this.descriptionControl.setValue(hero.description);
        if (hero.hashtags) {
          this.hashtags = hero.hashtags;
          this.hashtagControl.setValue(this.hashtags);
          this.hashtagControl.setValidators([identicalHashValidator(this.hashtags)]);
        }
      });
    }
  }

  public ngOnDestroy() {
    if(this.editEnabled) {
      this.heroSubscriber.unsubscribe();
    }
  }

  public sendForm(): void {
    if (this.heroFormGroup.valid) {
      this.onFormSubmit.emit(this.heroFormGroup.value);
      if (!this.hero) {
        this.heroFormGroup.reset();
        this.hashtags = [];
        this.heroForm.resetForm();
      }
    } else this.openSnackBar();
  }

  private openSnackBar(): void {
    this._snackBar.open('Form is not valid', 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  public addChip(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.hashtags = Object.assign([], this.hashtags);
      this.hashtags.push(value);

      this.hashtagControl.setValidators([identicalHashValidator(this.hashtags)]);
      this.hashtagControl.setValue(this.hashtags);
    }
    event.chipInput!.clear();
  }

  public removeChip(value: string): void {
    const index = this.hashtags.indexOf(value);
    if (index >= 0) {
      this.hashtags = Object.assign([], this.hashtags);
      this.hashtags.splice(index, 1);

      this.hashtagControl.setValidators([identicalHashValidator(this.hashtags)]);
      this.hashtagControl.setValue(this.hashtags);
    }
  }
}
