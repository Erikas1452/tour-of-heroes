import { environment } from 'src/environments/environment'
//Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
  //State NGXS
  import { NgxsModule } from '@ngxs/store';
  import { HeroState } from './state/hero-page-state/hero.state';
  import { UserState } from './state/user-state/user.state';
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
  import {MatTableModule} from '@angular/material/table';
  import {MatPaginatorModule} from '@angular/material/paginator';
//Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { HeroesComponent } from './components/heroes-page/heroes/heroes.component';
import { HeroDetailComponent } from './components/heroes-page/hero-detail/hero-detail.component';
import { MessagesComponent } from './components/layout/messages/messages.component';
import { DashboardComponent } from './components/heroes-page/dashboard/dashboard.component';
import { HeroSearchComponent } from './components/heroes-page/hero-search/hero-search.component';
import { HeroFormComponent } from './components/heroes-page/hero-form/hero-form.component';
import { RegisterComponent } from './components/auth-page/register/register.component';
import { LoginComponent } from './components/common-components/login/login.component';
import { AdminLoginComponent } from './components/admin-page/admin-login/admin-login.component';
import { UserLoginComponent } from './components/auth-page/user-login/user-login/user-login.component';
  //Pop-Ups
  import { DescriptionDialogComponent } from './components/pop-ups/description-dialog/description-dialog.component';
  import { HeroEditFormDialogComponent } from './components/pop-ups/hero-edit-form-dialog/hero-edit-form-dialog.component';
//Services
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Interceptors
import { AuthInterceptor } from './interceptors/auth.interceptor';
//Extras
import { JwtHelperService, JWT_OPTIONS} from '@auth0/angular-jwt';
import { AdminDashboardComponent } from './components/admin-page/admin-dashboard/admin-dashboard.component';
import { AdminViewState } from './state/admin-view-state/adminView.state';

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
    RegisterComponent,
    AdminLoginComponent,
    UserLoginComponent,
    AdminDashboardComponent
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
    MatTableModule,
    MatPaginatorModule,
    NgxsModule.forRoot([HeroState, UserState, AdminViewState], {
      developmentMode: !environment.production,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
