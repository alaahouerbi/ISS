import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { ChatService } from "../../shared/services/chat.service";
import {AuthService} from '../../shared/services/auth.service';
import {Message} from '../../shared/models/message.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  message: Message;
  messages: Message[] = [];
  constructor(private chatService:ChatService,private authService:AuthService) { }

  ngOnInit(): void {
   this.chatService.getMessagesOnInit().subscribe((message: Message) => {
      this.messages.push(message);
    });
    console.log(this.messages);

    this.chatService
    .getMessages()
    .subscribe((message: Message) => {
      this.messages.push(message);
    });
  }
  sendMessage() {
    this.message.sender=this.authService.getCurrentUser._id;
    this.chatService.sendMessage(this.message);
    this.messages.push(this.message);
    this.message.text='';
    this.message.sender='';

  }
}
