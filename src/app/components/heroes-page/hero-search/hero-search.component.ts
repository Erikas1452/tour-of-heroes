import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { BehaviorSubject, debounceTime, Observable, tap} from 'rxjs';
import { Hero } from 'src/app/common/hero';
import { RemoveSearchResults, SearchHeroes} from 'src/app/state/hero-page-state/hero.actions';
import { HeroState } from 'src/app/state/hero-page-state/hero.state';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss'],
})
export class HeroSearchComponent implements OnInit {
  public heroes$: Observable<Hero[]> = this.store.select(HeroState.selectSearchResults);
  searchFilter$ = new BehaviorSubject<string>('');

  constructor(private store: Store) {}

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
