import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ClearMessages } from 'src/app/state/hero-page-state/hero.actions';
import { HeroState } from 'src/app/state/hero-page-state/hero.state';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesComponent implements OnInit {
  public messages$: Observable<string[]> = this.store.select(HeroState.selectMessages);

  constructor(private store: Store) {}

  public ngOnInit(): void {}

  public trackMessagesByIndex(index: number, message: string) {
    return index;
  }

  public clear(){
    this.store.dispatch(new ClearMessages());
  }
}
