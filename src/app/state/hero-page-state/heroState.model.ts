import { Hero } from "src/app/common/hero";

export interface HeroStateModel{
    heroes: Hero[],
    messages: String[],
    searchResults: Hero[],
    selectedHero?: Hero,
}