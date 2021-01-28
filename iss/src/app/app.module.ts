import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AuthModule} from './auth/auth.module';
import { AppComponent } from './app.component';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,FormsModule,ReactiveFormsModule,RouterModule,AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
