import { Hero } from "src/app/common/hero";

export interface HeroStateModel{
    heroes: Hero[],
    messages: string[],
    searchResults: Hero[],
    selectedHero?: Hero,
}