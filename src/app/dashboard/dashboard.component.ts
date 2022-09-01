import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Hero } from '../hero';
import { HeroService } from '../services/hero-service/hero.service';
import { LoadingService } from '../services/loading-service/loading.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  showSpinner: boolean = false;

  constructor(
    private heroService: HeroService,
    private loadingService: LoadingService
  ) {
    this.loadingService.spinner$.subscribe((data: boolean) => {
      setTimeout(() => {
        this.showSpinner = data;
      });
    });
  }

  ngOnInit(): void {
    this.loadingService.show();
    this.getHeroes().subscribe((heroes) => {
      this.heroes = heroes.slice(1, 5);
      this.loadingService.hide();
    });
  }

  getHeroes(): Observable<Hero[]> {
    return this.heroService.getHeroes();
  }
}
