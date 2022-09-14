import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { HeroService } from '../services/hero-service/hero.service';
import {
  AddHashTag,
  AddHero,
  DeleteHashTag,
  EditHero,
  GetHero,
  GetHeroes,
} from './hero.actions';
import { HeroStateModel } from './heroState.model';
import {
  patch,
  append,
  removeItem,
  insertItem,
  updateItem,
} from '@ngxs/store/operators';
import { Hero } from '../hero';
import { E } from '@angular/cdk/keycodes';

@State<HeroStateModel>({
  name: 'HeroesPageState',
  defaults: {
    heroes: [],
    messages: [],
    selectedHero: undefined,
  },
})
@Injectable()
export class HeroState {
  constructor(private heroService: HeroService) {}

  @Selector()
  static selectHero(state: HeroStateModel) {
    return state.selectedHero;
  }

  @Selector()
  static selectHeroes(state: HeroStateModel) {
    return state.heroes;
  }

  @Action(EditHero)
  editHero(ctx: StateContext<HeroStateModel>, action: EditHero) {
    const state = ctx.getState();
    return this.heroService.updateHero(action.hero).pipe(
      tap(() => {
        ctx.setState(
          patch<HeroStateModel>({
            heroes: updateItem<Hero>(
              (hero) => hero?.id === action.hero.id,
              action.hero
            ),
          })
        );
      })
    );
  }

  @Action(AddHashTag)
  addHashTag(ctx: StateContext<HeroStateModel>, action: AddHashTag) {
    const state = ctx.getState();
    if (state.selectedHero?.hashtags !== undefined)
      return ctx.setState(
        patch<HeroStateModel>({
          selectedHero: patch<HeroStateModel['selectedHero']>({
            hashtags: [...state.selectedHero.hashtags, action.tag],
          }),
        })
      );
    else {
      return ctx.setState(
        patch<HeroStateModel>({
          selectedHero: patch<HeroStateModel['selectedHero']>({
            hashtags: [action.tag],
          }),
        })
      );
    }
  }

  @Action(DeleteHashTag)
  deleteHashTag(ctx: StateContext<HeroStateModel>, action: DeleteHashTag) {
    const state = ctx.getState();
    return ctx.setState(
      patch<HeroStateModel>({
        selectedHero: patch<HeroStateModel['selectedHero']>({
          hashtags: removeItem<string>((tag) => tag === action.tag),
        }),
      })
    );
  }

  @Action(AddHero)
  addHero(ctx: StateContext<HeroStateModel>, action: AddHero) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      heroes: [...state.heroes, action.hero],
    });
  }

  @Action(GetHero)
  getHeroes(ctx: StateContext<HeroStateModel>, action: GetHero) {
    const state = ctx.getState();
    return this.heroService.getHero(action.heroId).pipe(
      tap((response: any) => {
        ctx.setState({
          ...state,
          selectedHero: response,
        });
      })
    );
  }

  @Action(GetHeroes)
  getAllHeroes(ctx: StateContext<HeroStateModel>) {
    const state = ctx.getState();
    return this.heroService.getHeroes().pipe(
      tap((response: any) => {
        ctx.setState({
          ...state,
          heroes: response,
        });
      })
    );
  }
}
