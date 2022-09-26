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
        name: 'Dr. Strange',
        level: 6,
        companyType: 'Marvel',
        description: `A strange hero A strange heroA strange heroA strange 
          heroA strangeheroA strange heroA strange heroA strange
          heroA strange heroA strange heroA strange heroA strange
          heroA strange heroA strange hero A strange hero A strange heroA strange heroA strange 
          heroA strangeheroA strange heroA strange heroA strange
          heroA strange heroA strange heroA strange heroA strange
          heroA strange heroA strange hero A strange hero A strange heroA strange heroA strange 
          heroA strangeheroA strange heroA strange heroA strange
          heroA strange heroA strange heroA strange heroA strange
          heroA strange heroA strange hero`,
        hashtags: ['Doctor', 'Strange', 'Marvel'],
      },
      {
        id: 14,
        name: 'Batman',
        level: 9,
        companyType: 'DC',
        description: 'Dark knight',
        hashtags: ['Good', 'Dark', 'DC', 'Dark'],
      },
      {
        id: 15,
        name: 'Spiderman',
        level: 9,
        companyType: 'Marvel',
        description: 'A nice hero',
        hashtags: ['Spidey', 'Spider', 'Marvel'],
      },
      {
        id: 16,
        name: 'Little spooder',
        level: 4,
        companyType: 'Marvel',
        description: 'A nice spooder',
        hashtags: ['Spidey', 'Marvel'],
      },
      {
        id: 17,
        name: 'Dr. Nice',
        level: 6,
        companyType: 'Marvel',
        description: 'A nice hero',
        hashtags: ['Nice', 'Hero', 'Marvel'],
      },
      {
        id: 18,
        name: 'Dr. Nice',
        level: 6,
        companyType: 'Marvel',
        description: 'A nice hero',
        hashtags: ['Nice', 'Hero', 'Marvel'],
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
