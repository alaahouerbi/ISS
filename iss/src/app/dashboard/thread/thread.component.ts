import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { ThreadService } from '../../shared/services/thread.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { FormsModule,FormControl } from "@angular/forms";
import { Post,Thread } from "../../shared/models/thread.model"
@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css'],
})
export class ThreadComponent implements OnInit {
  formReply = new FormControl('');
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
  onSubmit(){
   let text= this.formReply.value;
   let post={} as Post;

  post.text=text;
  post.postedOn=new Date();
  post.poster=this.authService.userValue.id;
  this.threadService.postInThread(this.threadId,post).subscribe({
    next:(data:Thread)=>this.listOfPosts.next(data.posts),
    error:(error)=>console.log(error)
    }
  )
  this.formReply.reset();

  }

}
