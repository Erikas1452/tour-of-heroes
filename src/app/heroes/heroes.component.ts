import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Hero } from '../hero';
import { HeroService } from '../services/hero-service/hero.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  addOnBlur: boolean = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  hashtags: string[] = [];

  nameControl: FormControl = new FormControl('');
  levelControl: FormControl = new FormControl('');
  companyControl: FormControl = new FormControl('');
  descriptionControl: FormControl = new FormControl('');
  hashtagControl: FormControl = new FormControl([]);
  

  addHeroGroup : FormGroup = this._formBuilder.group({
    name: this.nameControl,
    level: this.levelControl,
    company: this.companyControl,
    description: this.descriptionControl,
    hashtags: this.hashtagControl
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

  add(): void {
    console.log(this.addHeroGroup);
    // name = name.trim();
    // if (!name) {
    //   return;
    // }
    // this.heroService.addHero({ name } as Hero).subscribe((hero) => {
    //   this.heroes.push(hero);
    // });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

  addChip(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.hashtags.push(value);
      this.hashtagControl.setValue(this.hashtags);
    }
    event.chipInput!.clear();
    
  }

  removeChip(value: string): void {
    const index = this.hashtags.indexOf(value);
    if (index >= 0) {
      this.hashtags.splice(index, 1);
      this.hashtagControl.setValue(this.hashtags);
    }
  }
}
