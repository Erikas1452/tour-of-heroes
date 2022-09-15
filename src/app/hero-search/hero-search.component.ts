import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { debounceTime, distinctUntilChanged, Observable, Subscription } from 'rxjs';
import { Hero } from '../hero';
import { RemoveSearchResults, SearchHeroes } from '../state/hero.actions';
import { HeroState } from '../state/hero.state';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  @Select(HeroState.selectSearchResults) heroes$!: Observable<Hero>;
  public heroes: Hero[] = [];
  private heroSubscriber: Subscription;

  constructor(private store: Store) {
    this.heroSubscriber = this.heroes$.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((heroes: any) => {
      this.heroes = heroes;
    });
  }

  ngOnDestroy(){
    this.store.dispatch(new RemoveSearchResults());
    this.heroSubscriber.unsubscribe();
  }

  public search(term: string): void {
    this.store.dispatch(new SearchHeroes(term));
  }

  public ngOnInit(): void {
  }

}
