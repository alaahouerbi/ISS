import { Component, OnInit } from '@angular/core';
import { ThreadService } from '../../shared/services/thread.service';
import { AuthService } from '../../shared/services/auth.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Thread, Post } from '../../shared/models/thread.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.css'],
})
export class ThreadListComponent implements OnInit {
  // TODO continue ThreadListImplementation its gonna be an array
  //wala a bunch of cards or something
  listOfThreads: BehaviorSubject<Thread[]> = new BehaviorSubject<Thread[]>([]);
  constructor(
    private threadService: ThreadService,
    private authService: AuthService,
    private router:Router
  ) {}
  Threads: Observable<Thread[]>;

  ngOnInit(): void {
    this.threadService.getThreads().subscribe({
      next: (data: Thread[]) => {
        this.listOfThreads.next(data);
        console.log(data);
      },
      error: (data: any) => console.log(data),
    });
  }
  viewThread(threadId:string){
     this.router.navigate(["/forum/thread",threadId]);
  }
}
