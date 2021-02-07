import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {io} from 'socket.io-client';
import { HttpClient, HttpParams } from "@angular/common/http";
import {Message} from '../models/message.model';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url = 'http://localhost:3000';
    private socket;

  constructor( private httpClient: HttpClient ) {
    this.socket = io(this.url);
  }
  /*after a bit of thought it turns out this design is bad
  the correct course of action would:
  client emits a message
  backend listens for emit
  on emit fire a callback and stores that message in Db
  instead of the client sending the message twice
  once to the DB and once to connected sockets
  will fix it tommorow
  */
  public sendMessage(message:Message){
    this.socket.emit('new-message',message);
      this.postMessage(message);

  }
  private postMessage(message:Message){
    this.httpClient.post(this.url+'/api/messages/addMessage',{message})
  }
  public getMessagesOnInit= ()=>{
    return this.httpClient.get(this.url+'/api/messages/getMessages');
  }
  public getMessages = () => {
    return Observable.create((observer) => {
        this.socket.on('new-message', (message) => {
            observer.next(message);
        });
    });
}
}
