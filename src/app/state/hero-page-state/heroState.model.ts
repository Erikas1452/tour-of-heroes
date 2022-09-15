import { Hero } from "src/app/hero";

export interface HeroStateModel{
    heroes: Hero[],
    messages: String[],
    searchResults: Hero[],
    selectedHero?: Hero,
}