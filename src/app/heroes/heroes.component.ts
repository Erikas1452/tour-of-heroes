import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Hero } from '../hero';
import { HeroService } from '../services/hero-service/hero.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DescriptionDialogComponent } from '../description-dialog/description-dialog.component';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  addOnBlur: boolean = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  hashtags: string[] = [];

  nameControl: FormControl = new FormControl('', [Validators.required]);
  levelControl: FormControl = new FormControl('', [Validators.required]);
  companyControl: FormControl = new FormControl('', [Validators.required]);
  descriptionControl: FormControl = new FormControl('', [Validators.required]);
  hashtagControl: FormControl = new FormControl([], []);

  addHeroGroup: FormGroup = this._formBuilder.group({
    name: this.nameControl,
    level: this.levelControl,
    company: this.companyControl,
    description: this.descriptionControl,
    hashtags: this.hashtagControl,
  });

  constructor(
    private heroService: HeroService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  openSnackBar() {
    this._snackBar.open('Form is not valid', 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  getHeroes(): Observable<Hero[]> {
    return this.heroService.getHeroes();
  }

  add(): void {
    if (this.addHeroGroup.valid) {
      this.heroService
        .addHero(this.addHeroGroup.value as Hero)
        .subscribe((hero) => {
          this.heroes.push(hero);
        });
    } else this.openSnackBar();
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
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

  openDialog(description: string){
    const dialogRef = this._dialog.open(DescriptionDialogComponent, {
      width: '450px',
      data: {desc: description}
    });
  }
}
