import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { MessageService } from '../services/message-service/message.service';
import { ClearMessages } from '../state/hero-page-state/hero.actions';
import { HeroState } from '../state/hero-page-state/hero.state';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  public messages!: string[];
  @Select(HeroState.selectMessages) messages$!: Observable<string[]>;
  private messageSubscriber: Subscription;

  constructor(private store: Store) {
    this.messageSubscriber = this.messages$.subscribe((messages) => {
      this.messages = messages;
    });
  }

  public ngOnDestroy(){
    this.messageSubscriber.unsubscribe();
  }

  public ngOnInit(): void {}

  public clear(){
    this.store.dispatch(new ClearMessages());
  }
}
