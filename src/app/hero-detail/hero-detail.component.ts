import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../services/hero-service/hero.service';
import { Observable } from 'rxjs';
import { LoadingService } from '../services/loading-service/loading.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  hero?: Hero;
  showSpinner: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
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
    this.getHero().subscribe((hero) => {
      this.hero = hero;
      this.loadingService.hide();
    });
  }

  getHero(): Observable<Hero> {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    return this.heroService.getHero(id);
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }
}
