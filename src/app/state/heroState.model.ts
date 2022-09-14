import { Hero } from "../hero";

export interface HeroStateModel{
    heroes: Hero[],
    messages: String[],
    searchResults: Hero[],
    selectedHero?: Hero,
}