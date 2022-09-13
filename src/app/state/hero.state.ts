import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { HeroService } from '../services/hero-service/hero.service';
import { AddHero, GetHeroes } from './hero.actions';
import { HeroStateModel } from './heroState.model';

@State<HeroStateModel>({
  name: 'HeroesState',
  defaults: {
    heroes: [],
    messages: [],
  },
})
@Injectable()
export class HeroState {
  constructor(private heroService: HeroService) {}

  @Selector()
  static selectHeroes(state: HeroStateModel) {
    return state.heroes;
  }

  @Action(AddHero)
  addHero(ctx: StateContext<HeroStateModel>, action: AddHero) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      heroes: [...state.heroes, action.hero],
    });
  }

  @Action(GetHeroes)
  getAllHeroes(ctx: StateContext<HeroStateModel>) {
    const state = ctx.getState();
    return this.heroService.getHeroes().pipe(
      tap((response: any) => {
        console.log(response);
        ctx.setState({
          ...state,
          heroes: response,
        });
      })
    );
  }
}
