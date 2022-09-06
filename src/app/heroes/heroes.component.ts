import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Hero } from '../hero';
import { HeroService } from '../services/hero-service/hero.service';
import { MatDialog } from '@angular/material/dialog';
import { DescriptionDialogComponent } from '../description-dialog/description-dialog.component';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  public heroes: Hero[] = [];

  constructor(private heroService: HeroService, public _dialog: MatDialog) {}

  public ngOnInit(): void {
    this.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  private getHeroes(): Observable<Hero[]> {
    return this.heroService.getHeroes();
  }

  public addHero(event: Hero): void {
    console.log(typeof(event));
    this.heroService.addHero(event as Hero).subscribe((hero) => {
      this.heroes.push(hero);
    });
  }

  public delete(hero: Hero): void {
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

  public openDialog(description: string): void {
    const dialogRef = this._dialog.open(DescriptionDialogComponent, {
      width: '450px',
      data: { desc: description },
    });
  }
}
