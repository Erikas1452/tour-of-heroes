import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Output() onThemeEmit: EventEmitter<string> = new EventEmitter<string>();
  title: string = 'Tour of Heroes';

  constructor() {}

  ngOnInit(): void {}

  onThemeSelect(theme: string) {
    this.onThemeEmit.emit(theme);
  }
}
