import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { BehaviorSubject, debounceTime, Observable, tap} from 'rxjs';
import { Hero } from 'src/app/common/hero';
import { User } from 'src/app/common/user';
import { RemoveSearchResults, SearchHeroes} from 'src/app/state/hero-page-state/hero.actions';
import { HeroState } from 'src/app/state/hero-page-state/hero.state';
import { UserState } from 'src/app/state/user-state/user.state';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroSearchComponent implements OnInit {
  public heroes$: Observable<Hero[]> = this.store.select(HeroState.selectSearchResults);

  private user$: Observable<User | undefined> = this.store.select(UserState.selectUser);
  private user!: User;
  
  private searchFilter$ = new BehaviorSubject<string>('');

  constructor(private store: Store) {
    this.user$.subscribe((res: any) => this.user = res);
  }

  public ngOnInit(): void {
    this.searchFilter$
      .pipe(
        debounceTime(300),
        tap((term) => {
          this.store.dispatch(new SearchHeroes(term, this.user.id));
        })
      )
      .subscribe();
  }

  public ngOnDestroy() {
    this.store.dispatch(new RemoveSearchResults());
  }

  public trackHeroesByID(index: number, hero: Hero) {
    return hero.id;
  }

  public search(term: string): void {
    this.searchFilter$.next(term);
  }
}
