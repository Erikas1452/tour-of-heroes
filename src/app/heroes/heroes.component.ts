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
import { identicalHashValidator } from '../common/functions';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService, public _dialog: MatDialog) {}

  ngOnInit(): void {
    this.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  getHeroes(): Observable<Hero[]> {
    return this.heroService.getHeroes();
  }

  addHero(event: Hero): void {
    console.log(typeof(event));
    this.heroService.addHero(event as Hero).subscribe((hero) => {
      this.heroes.push(hero);
    });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

  openDialog(description: string) {
    const dialogRef = this._dialog.open(DescriptionDialogComponent, {
      width: '450px',
      data: { desc: description },
    });
  }
}
