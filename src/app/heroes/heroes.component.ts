import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Hero } from '../hero';
import { HeroService } from '../services/hero-service/hero.service';
import { MatDialog } from '@angular/material/dialog';
import { DescriptionDialogComponent } from '../pop-up-dialogs/description-dialog/description-dialog.component';
import { Select, Store } from '@ngxs/store';
import { AddHero, DeleteHero } from '../state/hero-page-state/hero.actions';
import { HeroState } from '../state/hero-page-state/hero.state';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  public heroes: Hero[] = [];
  @Select(HeroState.selectHeroes) heroes$!: Observable<Hero[]>

  constructor(private heroService: HeroService, public _dialog: MatDialog, private store: Store) {}

  public ngOnInit(): void {}
  
  public addHero(event: Hero): void {
    this.store.dispatch(new AddHero(event as Hero))
  }

  public delete(hero: Hero): void {
    this.store.dispatch(new DeleteHero(hero.id))
  }

  public openDialog(description: string): void {
    const dialogRef = this._dialog.open(DescriptionDialogComponent, {
      width: '450px',
      data: { desc: description },
    });
  }
}
