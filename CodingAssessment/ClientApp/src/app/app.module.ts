import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { DataService } from './framework/services/data.service';
import { ConfigService } from './framework/services/config.service';
import { JwtInterceptor } from './framework/authorisation/jwt.interceptor';
import { AuthService } from './framework/authorisation/auth.service';
import { RoleGuard } from './framework/authorisation/role.guard';
import { AuthGuard } from './framework/authorisation/auth.guard';
import { AuthorListComponent } from './author/author-list/author-list.component';
import { AuthorEditComponent } from './author/author-edit/author-edit.component';
import { BookListComponent } from './book/book-list/book-list.component';
import { BookEditComponent } from './book/book-edit/book-edit.component';
import { LoginComponent } from './pages/account/login/login.component';


export function initApp(configService: ConfigService): (() => Promise<boolean>) {
  return configService.init();
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    /*FetchDataComponent,*/
    AuthorListComponent,
    AuthorEditComponent,
    BookListComponent,
    BookEditComponent,
    /*LoginComponent*/
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([

      { path: '', component: HomeComponent, pathMatch: 'full' },
      /* { path: 'login', component: LoginComponent, pathMatch: 'full' },*/
      { path: 'counter', component: CounterComponent },
      { path: 'author-list', component: AuthorListComponent },
      { path: 'author-list/author-edit/:id', component: AuthorEditComponent },
      { path: 'book-list', component: BookListComponent },
      { path: 'book-list/book-edit/:id', component: BookEditComponent },
    ])
  ],
  providers: [
    AuthGuard,
    RoleGuard,
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [ConfigService],
      multi: true
    },
    DataService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: LOCALE_ID, useValue: "en-ZA"
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
