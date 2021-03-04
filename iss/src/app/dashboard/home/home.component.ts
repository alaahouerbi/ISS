import { Component, OnInit } from '@angular/core';
import { from, Observable, BehaviorSubject } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { ChatService } from '../../shared/services/chat.service';
import { AuthService } from '../../shared/services/auth.service';
import { Message } from '../../shared/models/message.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  Messages: Observable<any>;
  messages: any[] = [];

  messageFrom = this.formBuilder.group({
    text: '',
    _id: this.authService.getUser()._id,
  });
  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.chatService.getMessagesOnInit().subscribe((data:any[])=>{
      data.reverse();
      data.forEach(element => {
        this.messages.push(element);

      });

    })
    this.chatService.getMessages().subscribe((message: any) => {
      console.log(message);
      this.messages.push(message);
    });
  }
  onSubmit() {
    let tosend = {} as Message;
    tosend.text = this.messageFrom.controls['text'].value;
    tosend.sentAt = new Date();
    tosend.sender = this.authService.userValue.id;

    this.chatService.sendMessage(tosend);
    this.messageFrom.reset({ text: '', id: '' });
    console.log(this.messages);
    this.keepArrayLength()
  }


  private keepArrayLength(){
    if(this.messages.length>10)
      this.messages.shift();
  }
   isMeOrSomeElse(m:Message):string{



    if(m.sender===this.authService.userValue.id)
        return 'm'; //m for me
    else{
      return 's';
      } //s for someoneElse
    //should make this an enum probably
  }
  getStyles(m:Message):string{
    let x=this.isMeOrSomeElse(m);
    let s="{\'background-color\':\'#abfeab\'}";
    if(x=='m')
      s="{\'background-color\':\'#defeab\'}"
    return s;
  }
}
