import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../services/hero-service/hero.service';
import { Observable, Subscription } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { EditHero, GetHero } from '../state/hero.actions';
import { HeroState } from '../state/hero.state';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  @Select(HeroState.selectHero) hero$!: Observable<Hero>
  public hero!: Hero;
  private heroSubscriber: Subscription;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private store: Store,
  ) {
    this.heroSubscriber = this.hero$.subscribe((hero: Hero) => {
      this.hero = hero;
    });
  }

  ngOnDestroy(){
    this.heroSubscriber.unsubscribe();
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(new GetHero(id));
  }

  editHero(event: any): void {
    const hero = {...event, id: this.hero?.id};
    this.store.dispatch(new EditHero(hero));

    // this.heroService
    //   .updateHero(hero)
    //   .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
