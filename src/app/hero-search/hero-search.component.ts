import { Component, OnInit } from '@angular/core';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../services/hero-service/hero.service';
import { LoadingService } from '../services/loading-service/loading.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();
  showSpinner: boolean = false;
  showSearchSpinner: boolean = false;

  constructor(
    private heroService: HeroService,
    private loadingService: LoadingService) {
      this.loadingService.spinner$.subscribe((data: boolean) => {
        setTimeout(() => {
          this.showSpinner = data;
        });
      });
      this.loadingService.searchSpinner$.subscribe((data: boolean) => {
        setTimeout(() => {
          this.showSearchSpinner = data;
        });
      });
    }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      tap(() =>  this.loadingService.showSearchSpinner()),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        return this.heroService.searchHeroes(term).pipe(
          tap(() => this.loadingService.hideSearchSpinner())
        )
      }),
    )
  }

  ngOnDestroy() {
    // this.loadingService.spinner$.complete();
    // this.loadingService.searchSpinner$.complete();
    // console.log(this.loadingService);
  }

}
