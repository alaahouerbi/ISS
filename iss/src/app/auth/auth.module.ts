import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,RouterModule.forChild(routes),
  ],

  exports: [RouterModule]
})
export class AuthModule { }
