import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Hero } from '../hero';
import { HeroService } from '../services/hero-service/hero.service';
import { LoadingService } from '../services/loading-service/loading.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  selectedHero?: Hero;
  showSpinner: boolean = false;

  constructor(
    private heroService: HeroService,
    private loadingService: LoadingService) {
      this.loadingService.spinner$.subscribe((data: boolean) => {
        setTimeout(() => {
          this.showSpinner = data;
        });
      });
    }

  ngOnInit(): void {
    this.loadingService.show();
    this.getHeroes().subscribe((heroes) => {
      this.heroes = heroes;
      this.loadingService.hide();
    });
  }

  getHeroes(): Observable<Hero[]> {
    return this.heroService.getHeroes();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({ name } as Hero).subscribe((hero) => {
      this.heroes.push(hero);
    });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
