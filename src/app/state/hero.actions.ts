import { Hero } from "../hero";

export class GetHeroes {
    static readonly type = '[Hero API] Get Heroes';
}

export class GetHero {
    static readonly type = '[Hero API] Get Hero';
    constructor(public heroId: number){}
}

export class EditHero {
    static readonly type = '[Hero API] Edit Hero';
    constructor(public hero: Hero){}
}

export class AddHero {
    static readonly type = '[Hero] Add Hero';
    constructor(public hero: Hero){}
}

export class DeleteHero {
    static readonly type = '[Hero] Delete Hero';
    constructor(public heroId: number){}
}

export class AddHashTag {
    static readonly type = '[Hero] Add Hash Tag';
    constructor(public tag: string){}
}

export class DeleteHashTag {
    static readonly type = '[Hero] Delete Hash Tag';
    constructor(public tag: string){}
}