import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Hero } from '../hero';
import { GetHeroes } from '../state/hero-page-state/hero.actions';
import { HeroState } from '../state/hero-page-state/hero.state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  
  public heroes$: Observable<Hero[]> = this.store.select(HeroState.selectHeroes);
  public topHeroes: Hero[] = [];
  private heroSubscriber: Subscription;

  constructor(private store: Store) {
    this.store.dispatch(new GetHeroes());
    this.heroSubscriber = this.heroes$.subscribe((heroes: Hero[]) => {
      this.topHeroes = heroes.slice(1,5);
    });
  }

  public ngOnDestroy(){
    this.heroSubscriber.unsubscribe();
  }

  public ngOnInit(): void {}
}
