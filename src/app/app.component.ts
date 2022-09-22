import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetHeroes } from './state/hero-page-state/hero.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  public theme:string = "theme-light";
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new GetHeroes());
  }

  changeTheme(e: any){
    this.theme = e;
  }
}
