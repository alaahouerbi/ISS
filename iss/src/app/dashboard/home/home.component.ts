import { Component, OnInit } from '@angular/core';
import { from, Observable,BehaviorSubject } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { ChatService } from "../../shared/services/chat.service";
import {AuthService} from '../../shared/services/auth.service';
import {Message} from '../../shared/models/message.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Messages:Observable<any>;
  messages:any[]=[];

  messageFrom=this.formBuilder.group({
    text:'',_id: this.authService.getUser()._id
  })
  constructor(private chatService:ChatService,private authService:AuthService,private formBuilder: FormBuilder) {   }

  ngOnInit(): void {

  this.chatService.getMessages()
  .subscribe((message:any)=>{
    console.log(message);
    this.messages.push(message);

  })

  }
  onSubmit(){



    let tosend={}as Message;
    tosend.text=this.messageFrom.controls['text'].value;
    tosend.sentAt=new Date();
    tosend.sender=this.authService.getUser().id;

    this.chatService.sendMessage(tosend);
    this.messageFrom.reset({text:'',id:''});
    console.log(this.messages);

  }
  logOut(){


    this.authService.logout();
  }

}
