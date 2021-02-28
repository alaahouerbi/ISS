import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {io} from 'socket.io-client';
import { HttpClient, HttpParams } from "@angular/common/http";
import {Message} from '../models/message.model';
import { distinctUntilChanged,map } from 'rxjs/operators';
import { AuthService } from "./auth.service";
import { environment } from '@env';
@Injectable({
  providedIn: 'root'
})

export class ChatService {
  private url = environment.apiUrl;
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

  public getMessagesOnInit(){
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
