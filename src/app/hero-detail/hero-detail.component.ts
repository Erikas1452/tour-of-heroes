import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { EditHero, RemoveSelectedHero, SelectHero } from '../state/hero-page-state/hero.actions';
import { HeroState } from '../state/hero-page-state/hero.state';
import { MatDialog } from '@angular/material/dialog';
import { HeroEditFormDialogComponent } from '../pop-up-dialogs/hero-edit-form-dialog/hero-edit-form-dialog.component';

export interface DialogData {
  id: number;
  name: string;
  hero: Hero;
}
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
})

export class HeroDetailComponent implements OnInit {
  public hero$: Observable<Hero | undefined> = this.store.select(HeroState.selectHero);
  public hero!: Hero | undefined;
  private heroSubscriber: Subscription;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store,
    public dialog: MatDialog,
  ) {
    this.heroSubscriber = this.hero$.subscribe((hero: Hero | undefined) => {
      this.hero = hero;
    });
  }

  public openDialog(){
    const dialogRef = this.dialog.open(HeroEditFormDialogComponent, {
      width: '95%',
      data: {id: this.hero?.id, name: this.hero?.name, hero: this.hero},
      panelClass: 'themed-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.editHero(result);
      }
    });
  }

  public ngOnDestroy(){
    this.store.dispatch(new RemoveSelectedHero());
    this.heroSubscriber.unsubscribe();
  }

  public ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(new SelectHero(id));
  }

  private editHero(event: any): void {
    const hero = {...event, id: this.hero?.id};
    this.store.dispatch(new EditHero(hero));
    this.goBack();
  }

  public goBack(): void {
    this.location.back();
  }
}
