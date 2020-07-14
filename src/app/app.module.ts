import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
// import { routes } from "./app-routing.module";
import { DatePipe } from '@angular/common';
import { ChartsModule } from '@progress/kendo-angular-charts';
import 'hammerjs';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ChartsModule,
    // RouterModule.forRoot(routes,{useHash:true})
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
