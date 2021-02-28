import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { ThreadService } from '../../shared/services/thread.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css'],
})
export class ThreadComponent implements OnInit {
  @Input() threadId: string;
  listOfPosts:BehaviorSubject<any[]>=new BehaviorSubject<any[]>([]);
  constructor(
    private threadService: ThreadService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.threadId = params.get('threadId');
    });
    this.threadService
      .getThread(this.threadId)
      .subscribe({
        next:(data:any[])=>this.listOfPosts.next(data)
      }
      );
  }
}
