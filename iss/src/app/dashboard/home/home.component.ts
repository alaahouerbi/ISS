import { Component, OnInit } from '@angular/core';
import { ChatService } from "../../shared/services/chat.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(chatService:ChatService) { }

  ngOnInit(): void {
  }

}
