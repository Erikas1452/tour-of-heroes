import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetHeroes } from './state/hero-page-state/hero.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: string = 'Tour of Heroes';
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new GetHeroes());
  }
}
