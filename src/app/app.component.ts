import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from './services/auth-service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  private bodyElement = document.body;
  private defaultStyle = this.bodyElement.className;
  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.bodyElement.className=this.defaultStyle + ' ' + 'theme-light';
  }

  changeTheme(e: any){
    this.bodyElement.className=this.defaultStyle + ' ' + e;
  }
}
