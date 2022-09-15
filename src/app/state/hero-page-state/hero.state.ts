import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { HeroService } from 'src/app/services/hero-service/hero.service';
import {
  AddHero,
  DeleteHero,
  EditHero,
  SelectHero,
  GetHeroes,
  RemoveSearchResults,
  SearchHeroes,
  RemoveSelectedHero,
} from './hero.actions';
import { HeroStateModel } from './heroState.model';
import {
  patch,
  append,
  removeItem,
  insertItem,
  updateItem,
} from '@ngxs/store/operators';
import { Hero } from 'src/app/hero';

@State<HeroStateModel>({
  name: 'HeroesPageState',
  defaults: {
    heroes: [],
    messages: [],
    searchResults: [],
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

  @Selector()
  static selectSearchResults(state: HeroStateModel){
    return state.searchResults;
  }

  @Action(SelectHero)
  selectHero(ctx: StateContext<HeroStateModel>, action: SelectHero) {
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

  @Action(RemoveSelectedHero)
  removeSelectedHero(ctx: StateContext<HeroStateModel>, action: SelectHero){
    const state = ctx.getState();
    return ctx.setState({
      ...state,
      selectedHero: undefined,
    });
  }

  @Action(SearchHeroes)
  searchHeroes(ctx: StateContext<HeroStateModel>, action: SearchHeroes){
    const state = ctx.getState();
    return this.heroService.searchHeroes(action.term).pipe(
      tap((results) => {
        ctx.setState({
          ...state,
          searchResults: results
        })
      })
    );
  }

  @Action(RemoveSearchResults)
  removeSearcgResults(ctx: StateContext<HeroStateModel>){
    const state = ctx.getState();
    return ctx.setState({
      ...state,
      searchResults: [],
    })
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

  @Action(AddHero)
  addHero(ctx: StateContext<HeroStateModel>, action: AddHero) {
    const state = ctx.getState();
    return this.heroService.addHero(action.hero).pipe(
      tap((response) => {
          ctx.setState({
          ...state,
          heroes: [...state.heroes, response],
        })
      })
    );
  }

  @Action(DeleteHero)
  deleteHero(ctx: StateContext<HeroStateModel>, action: DeleteHero){
    const state = ctx.getState();
    return this.heroService.deleteHero(action.heroId).pipe(
      tap((_) => {
          ctx.setState(
            patch<HeroStateModel>({
            heroes: removeItem<Hero>((hero) => hero?.id === action.heroId),
          })
        );
      })
    );
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
            selectedHero: undefined
          })
        );
      })
    );
  }
}
