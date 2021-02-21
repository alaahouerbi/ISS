import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { ChatService } from "../shared/services/chat.service";
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{
  path: 'home',
  component:HomeComponent
}];

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, RouterModule.forChild(routes),FormsModule,ReactiveFormsModule],
  exports: [
    RouterModule
  ]
})
export class DashboardModule {}
