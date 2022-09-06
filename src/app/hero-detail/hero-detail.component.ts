import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../services/hero-service/hero.service';
import { Observable } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { identicalHashValidator } from '../common/functions';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  hero?: Hero;
  addOnBlur: boolean = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  hashtags: string[] = [];

  nameControl: FormControl = new FormControl('', [Validators.required]);
  levelControl: FormControl = new FormControl('', [Validators.required]);
  companyControl: FormControl = new FormControl('', [Validators.required]);
  descriptionControl: FormControl = new FormControl('', [Validators.required]);
  hashtagControl: FormControl = new FormControl([],[]);

  editHeroGroup: FormGroup = this._formBuilder.group({
    name: this.nameControl,
    level: this.levelControl,
    companyType: this.companyControl,
    description: this.descriptionControl,
    hashtags: this.hashtagControl,
    id: this.hero?.id,
  });

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getHero().subscribe((hero) => {
      this.hero = hero;
      this.nameControl.setValue(hero.name);
      this.levelControl.setValue(hero.level);
      this.companyControl.setValue(hero.companyType);
      this.descriptionControl.setValue(hero.description);
      this.hashtagControl.setValue(hero.hashtags);
      if(hero.hashtags) this.hashtags = hero.hashtags;
      this.hashtagControl.setValidators([identicalHashValidator(this.hashtags)])
    });
  }

  getHero(): Observable<Hero> {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    return this.heroService.getHero(id);
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

  editHero(): void {
    if (this.editHeroGroup.valid) {
      this.editHeroGroup.setValue({
        ...(this.editHeroGroup.value as Hero),
        id: this.hero?.id,
      });
      this.heroService
        .updateHero(this.editHeroGroup.value as Hero)
        .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }
}
