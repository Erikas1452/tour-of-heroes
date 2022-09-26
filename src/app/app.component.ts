import { Component, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetHeroes } from './state/hero-page-state/hero.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  private bodyElement = document.body;
  private defaultStyle = this.bodyElement.className;
  constructor(private store: Store) {}

  ngOnInit() {
    this.bodyElement.className=this.defaultStyle + ' ' + 'theme-light';
    this.store.dispatch(new GetHeroes());
  }

  changeTheme(e: any){
    this.bodyElement.className=this.defaultStyle + ' ' + e;
  }
}
