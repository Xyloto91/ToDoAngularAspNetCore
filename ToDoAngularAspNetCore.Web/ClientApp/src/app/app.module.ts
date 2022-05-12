import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule, MatRippleModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ToDoComponent } from './to-do/to-do.component';
import { ToDoDetailComponent } from './to-do-detail/to-do-detail.component';
import { ToDoCardComponent } from './to-do-card/to-do-card.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ToDoComponent,
    ToDoDetailComponent,
    ToDoCardComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSnackBarModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'to-do', component: ToDoComponent }
    ])
  ],
  providers: [Window, { provide: MAT_DATE_LOCALE, useValue: 'hr' }, { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500, verticalPosition: 'top' } }],
  bootstrap: [AppComponent]
})
export class AppModule { }
