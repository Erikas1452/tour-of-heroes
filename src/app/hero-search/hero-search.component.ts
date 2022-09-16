import { Component, OnInit } from '@angular/core';
import { Actions, ofActionDispatched, Select, Store } from '@ngxs/store';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subscription,
  tap,
} from 'rxjs';
import { Hero } from '../hero';
import {
  RemoveSearchResults,
  SearchHeroes,
} from '../state/hero-page-state/hero.actions';
import { HeroState } from '../state/hero-page-state/hero.state';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
})
export class HeroSearchComponent implements OnInit {
  @Select(HeroState.selectSearchResults) heroes$!: Observable<Hero>;
  public heroes: Hero[] = [];
  private heroSubscriber!: Subscription;
  searchFilter$ = new BehaviorSubject<string>('');

  constructor(private store: Store, actions$: Actions) {
    this.heroSubscriber = this.heroes$.subscribe((heroes: any) => {
      this.heroes = heroes;
    });
  }

  public ngOnInit(): void {
    this.searchFilter$
      .pipe(
        debounceTime(300),
        tap((term) => {
          this.store.dispatch(new SearchHeroes(term));
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.store.dispatch(new RemoveSearchResults());
  }

  public search(term: string): void {
    this.searchFilter$.next(term);
  }
}
