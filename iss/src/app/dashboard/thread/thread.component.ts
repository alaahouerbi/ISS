import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {
  @Input() threadId:string
  constructor() { }

  ngOnInit(): void {
  }

}
