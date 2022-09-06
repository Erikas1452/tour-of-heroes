import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../services/hero-service/hero.service';
import { Observable } from 'rxjs';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

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

  nameControl: FormControl = new FormControl(this.hero?.name, [Validators.required]);
  levelControl: FormControl = new FormControl(this.hero?.level, [Validators.required]);
  companyControl: FormControl = new FormControl(this.hero?.companyType, [Validators.required]);
  descriptionControl: FormControl = new FormControl(this.hero?.description, [Validators.required]);
  hashtagControl: FormControl = new FormControl(this.hashtags, [this.identicalHashValidator(this.hashtags)]);

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
    private _formBuilder: FormBuilder,
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
      console.log(this.hashtags)
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

  save(): void {
    if (this.editHeroGroup.valid) {
      this.editHeroGroup.setValue({...this.editHeroGroup.value as Hero, id: this.hero?.id});
      this.heroService.updateHero(this.editHeroGroup.value as Hero)
        .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }

  private hasDuplicates(array: string[]) {
    console.log("RUNNING");
    var valuesSoFar = Object.create(null);
    for (var i = 0; i < array.length; ++i) {
        var value = array[i];
        if (value in valuesSoFar) {
            return true;
        }
        valuesSoFar[value] = true;
    }
    return false;
  }
  
  private identicalHashValidator(array: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = this.hasDuplicates(array);
      console.log(forbidden, array);
      if(forbidden) {
        return { valuesDoMatch: true };
      }
      else return null;
    }
  }
}
