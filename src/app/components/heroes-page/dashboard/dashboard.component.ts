import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Hero } from 'src/app/common/hero';
import { User } from 'src/app/common/user';
import { GetHeroes } from 'src/app/state/hero-page-state/hero.actions';
import { HeroState } from 'src/app/state/hero-page-state/hero.state';
import { UserState } from 'src/app/state/user-state/user.state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  private user$: Observable<User> = this.store.select(UserState.selectUser);
  private user!: User;
  
  public heroes$: Observable<Hero[]> = this.store.select(HeroState.selectHeroes);
  public topHeroes: Hero[] = [];
  private heroSubscriber: Subscription;

  constructor(private store: Store) {
    this.user$.subscribe((res: any) => this.user = res);
    this.store.dispatch(new GetHeroes(this.user.id));
    
    this.heroSubscriber = this.heroes$.subscribe((heroes: Hero[]) => {
      this.topHeroes = heroes.slice(1,5);
    });
  }

  public ngOnDestroy(){
    this.heroSubscriber.unsubscribe();
  }

  public ngOnInit(): void {}
}
