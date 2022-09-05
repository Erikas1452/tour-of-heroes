import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Hero } from '../hero';
import { HeroService } from '../services/hero-service/hero.service';
import { MessageService } from '../services/message-service/message.service';
import { Form, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  selectedHero?: Hero;
  hideRequiredControl: FormControl = new FormControl(false);
  addOnBlur: boolean = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  hashtags: string[] = [];

  hero : FormGroup = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
  });

  constructor(
    private heroService: HeroService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  getHeroes(): Observable<Hero[]> {
    return this.heroService.getHeroes();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({ name } as Hero).subscribe((hero) => {
      this.heroes.push(hero);
    });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

  addChip(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.hashtags.push(value);
    }
    event.chipInput!.clear();
  }

  remove(value: string): void {
    const index = this.hashtags.indexOf(value);
    if (index >= 0) {
      this.hashtags.splice(index, 1);
    }
  }
}
