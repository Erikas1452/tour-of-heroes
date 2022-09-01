import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  public spinner$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public searchSpinner$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  constructor() {}

  showSearchSpinner()
  {
    this.searchSpinner$.next(true);
  }

  hideSearchSpinner(){
    this.searchSpinner$.next(false);
  }

  show() {
    this.spinner$.next(true);
  }

  hide() {
    this.spinner$.next(false);
  }
}
