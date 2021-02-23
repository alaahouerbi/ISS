import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {io} from 'socket.io-client';
import { HttpClient, HttpParams } from "@angular/common/http";
import {Message} from '../models/message.model';
import { distinctUntilChanged,map } from 'rxjs/operators';
import { AuthService } from "./auth.service";
@Injectable({
  providedIn: 'root'
})
/*MessageArray:BehaviourSubject<Messages>

fel contrusctor ta3 el chat service
assign lel behaviour subject el chesmou
un truc du genre constructor
this.MessageArray.next(this.getMessagesOnInit().AsValue)//AsValue since getMessagesOnInit returns an Observable
ba3ed fel sendMessage this.MessageArray.next(this.MessageArray.value().push(message)
getMessages(this.socket.on('new Message',message=>{
this.MessageArray.next(this.MessageArray.value.push(message));
*/
//switch into replaySubject its exactly what i need
//would need some changes
export class ChatService {
  private url = 'http://localhost:3000';
  private socket;
  private messageArray:BehaviorSubject<Message[]>;
  public messageArrayObservable:Observable<any>;

  constructor( private httpClient: HttpClient,private authService:AuthService ) {
    this.socket = io(this.url);
    this.messageArray=new BehaviorSubject<Message[]>([]);


  }

  public sendMessage(message:Message){
    this.authService.getUser().subscribe(data=>message.sender=data.id
    )



    this.socket.emit('new-message',message);

  }

  private getMessagesOnInit(){
    return this.httpClient.get(this.url+'/api/messages/getMessages');
  }
  public getMessages = () => {
    return new  Observable(observer => {
        this.socket.on('new-message', (message) => {
            observer.next(message);

        });
    });
}
}
