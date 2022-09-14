import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Hero } from '../hero';
import { HeroState } from '../state/hero.state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  
  @Select(HeroState.selectHeroes) heroes$!: Observable<Hero[]>
  public topHeroes: Hero[] = [];
  private heroSubscriber: Subscription;

  constructor(private store: Store) {
    this.heroSubscriber = this.heroes$.subscribe((heroes: Hero[]) => {
      this.topHeroes = heroes.slice(1,5);
    });
  }

 public ngOnDestroy(){
    this.heroSubscriber.unsubscribe();
  }

  public ngOnInit(): void {}
}
