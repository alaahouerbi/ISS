import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
    import { RouterModule, Routes } from '@angular/router';
    import { HomeComponent } from '../app/dashboard/home/home.component'
    import {LoginComponent} from '../app/auth/login/login.component'
    import { RegisterComponent } from "../app/auth/register/register.component";
    const routes: Routes = [
        {
            path: '',
            component: HomeComponent
        },
        {
            path:'login',
            component:LoginComponent
        },
        {
            path:'register',
            component:RegisterComponent
        }

    ];

    @NgModule({
        imports: [
            RouterModule.forRoot(routes)
        ],
        exports: [
            RouterModule
        ],
        declarations: []
    })
    export class AppRoutingModule { }
