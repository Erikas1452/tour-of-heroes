import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Hero } from 'src/app/common/hero';
import { MatDialog } from '@angular/material/dialog';
import { DescriptionDialogComponent } from 'src/app/components/pop-ups/description-dialog/description-dialog.component';
import { Store } from '@ngxs/store';
import { AddHero, DeleteHero } from 'src/app/state/hero-page-state/hero.actions';
import { HeroState } from 'src/app/state/hero-page-state/hero.state';
import { UserState } from 'src/app/state/user-state/user.state';
import { User } from 'src/app/common/user';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  public heroes$: Observable<Hero[]> = this.store.select(HeroState.selectHeroes);
  private user$: Observable<User | undefined> = this.store.select(UserState.selectUser);
  private user!: User;

  constructor(public _dialog: MatDialog, private store: Store) {}

  public ngOnInit(): void {
    this.user$.subscribe((res: any) => this.user = res);
  }
  
  public addHero(event: Hero): void {
    const newHero = {...event, userId: this.user.id}
    this.store.dispatch(new AddHero(newHero as Hero))
  }

  public delete(hero: Hero): void {
    this.store.dispatch(new DeleteHero(hero.id))
  }

  public openDialog(description: string): void {
    const dialogRef = this._dialog.open(DescriptionDialogComponent, {
      width: '450px',
      data: { desc: description },
      panelClass: 'themed-dialog',
    });
  }
}
