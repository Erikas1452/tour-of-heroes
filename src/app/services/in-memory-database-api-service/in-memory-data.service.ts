import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from '../../hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes: Hero[] = [
      {
        id: 12,
        name: 'Dr. Nice',
        level: 6,
        companyType: 'Marvel',
        description: 'A nice hero',
        hashtags: ['Nice', 'Hero', 'Marvel'],
      },
      {
        id: 13,
        name: 'Batman',
        level: 9,
        companyType: 'DC',
        description: 'Dark knight',
        hashtags: ['Good', 'Dark', 'DC'],
      },
      {
        id: 14,
        name: 'Spiderman',
        level: 9,
        companyType: 'marvel',
        description: 'A nice hero',
        hashtags: ['Spidey', 'Spider', 'Marvel'],
      },
    ];
    return { heroes };
  }

  genId(heroes: Hero[]): number {
    return heroes.length > 0
      ? Math.max(...heroes.map((hero) => hero.id)) + 1
      : 11;
  }
}
