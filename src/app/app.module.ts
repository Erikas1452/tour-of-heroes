import { environment } from 'src/environments/environment'
//Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
  //State NGXS
  import { NgxsModule } from '@ngxs/store';
  import { HeroState } from './state/hero-page-state/hero.state';
  import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
  import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
  //Material
  import {MatChipsModule} from '@angular/material/chips';
  import {MatFormFieldModule} from '@angular/material/form-field';
  import {MatSelectModule} from '@angular/material/select';
  import {MatInputModule} from '@angular/material/input';
  import {MatRadioModule} from '@angular/material/radio';
  import {MatIconModule} from '@angular/material/icon';
  import {MatCardModule} from '@angular/material/card';
  import {MatSnackBarModule} from '@angular/material/snack-bar';
  import {MatDialogModule} from '@angular/material/dialog';
  import {MatToolbarModule} from '@angular/material/toolbar';
  import {MatMenuModule} from '@angular/material/menu';
  import {MatSidenavModule} from '@angular/material/sidenav';
  import {MatListModule} from '@angular/material/list';
//Components
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { DescriptionDialogComponent } from './pop-up-dialogs/description-dialog/description-dialog.component';
import { HeroFormComponent } from './hero-form/hero-form.component';
import { HeroEditFormDialogComponent } from './pop-up-dialogs/hero-edit-form-dialog/hero-edit-form-dialog.component';
//Services
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    DescriptionDialogComponent,
    HeroFormComponent,
    HeroEditFormDialogComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    MatSidenavModule,
    AppRoutingModule,
    MatListModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    MatToolbarModule,
    NgxsModule.forRoot([HeroState], {
      developmentMode: !environment.production,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
