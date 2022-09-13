import { Hero } from "../hero";

export class AddHero {
    static readonly type = '[Hero] Add Hero';
    constructor(public hero: Hero){}
}

export class DeleteHero {
    static readonly type = '[Hero] Delete Hero';
    constructor(public heroId: number){}
}

export class GetHeroes {
    static readonly type = '[Hero API] Get Heroes';
}