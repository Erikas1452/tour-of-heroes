import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ClearMessages } from 'src/app/state/hero-page-state/hero.actions';
import { HeroState } from 'src/app/state/hero-page-state/hero.state';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  public messages$: Observable<String[]> = this.store.select(HeroState.selectMessages);

  constructor(private store: Store) {}

  public ngOnInit(): void {}

  public clear(){
    this.store.dispatch(new ClearMessages());
  }
}
