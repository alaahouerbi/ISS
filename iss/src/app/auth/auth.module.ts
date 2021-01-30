import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login';
import { RegisterComponent } from './register/register.component';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },{
    path:'register',
    component:RegisterComponent
  }]
@NgModule({
  declarations: [ LoginComponent, RegisterComponent],
  imports: [
    CommonModule  , RouterModule.forChild(routes),  FormsModule,ReactiveFormsModule
  ],
  exports: [
    RouterModule
  ]
})
export class AuthModule { }
