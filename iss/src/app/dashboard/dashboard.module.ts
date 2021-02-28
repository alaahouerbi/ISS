import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { ChatService } from "../shared/services/chat.service";
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from "../shared/helpers/jwt.interceptor";
import { HTTP_INTERCEPTORS  } from '@angular/common/http';
import { ThreadListComponent } from './thread-list/thread-list.component';
import { ThreadComponent } from './thread/thread.component';

const routes: Routes = [{
  path: 'home',
  component:HomeComponent},{
  path:'forum',
  component:ThreadListComponent
},
{
  path:'thread/:threadId',
  component:ThreadComponent
}];

@NgModule({
  declarations: [HomeComponent, ThreadListComponent, ThreadComponent],
  imports: [CommonModule, RouterModule.forChild(routes),FormsModule,ReactiveFormsModule],
  exports: [
    RouterModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }]
})
export class DashboardModule {}
