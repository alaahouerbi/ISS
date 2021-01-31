import { Component, OnInit } from '@angular/core';
import { ChatService } from "../../shared/services/chat.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  message: string;
  messages: string[] = [];
  constructor(private chatService:ChatService) { }

  ngOnInit(): void {
    this.chatService.getMessagesOnInit().subscribe((message:string)=>{
      this.messages.push(message)
    });
    console.log(this.messages[0]);

    this.chatService
    .getMessages()
    .subscribe((message: string) => {
      this.messages.push(message);
    });
  }
  sendMessage() {

    this.chatService.sendMessage(this.message);
    this.messages.push(this.message);
    this.message = '';
  }
}
