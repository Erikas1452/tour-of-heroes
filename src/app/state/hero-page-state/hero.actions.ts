import { Hero } from "../../common/hero";

export class GetHeroes {
    static readonly type = '[Hero API] Get Heroes';
    constructor(public userId: number){};
}

export class ClearState {
    static readonly type = '[Hero API] Clear Heroes State';
}

export class SelectHero {
    static readonly type = '[Hero API] Get Hero';
    constructor(public heroId: number){};
}

export class RemoveSelectedHero {
    static readonly type = '[Hero] Remove Selected Hero';
}

export class SearchHeroes {
    static readonly type = '[Hero API] Get Hero by Term';
    constructor(public term: string, public userId: number){}
};


export class ClearMessages {
    static readonly type = '[Hero] Clear Messages'
}

export class RemoveSearchResults {
    static readonly type = '[Hero] Remove Search Rresults';
}

export class EditHero {
    static readonly type = '[Hero API] Edit Hero';
    constructor(public hero: Hero){};
}

export class AddHero {
    static readonly type = '[Hero API] Add Hero';
    constructor(public hero: Hero){};
}

export class DeleteHero {
    static readonly type = '[Hero API] Delete Hero';
    constructor(public heroId: number){};
}