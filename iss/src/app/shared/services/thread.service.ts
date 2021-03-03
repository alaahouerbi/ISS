import { Injectable } from '@angular/core';
import {Thread,Post}from '../models/thread.model';
import { environment } from '@env';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class ThreadService {
  private url=environment.apiUrl;
  constructor(private httpClient: HttpClient) { }
  public getThread(threadId:string){
    return this.httpClient.get(`${this.url}/api/forum/getThreadPosts/${threadId}`);
  }
  public getThreads(){
    return this.httpClient.get(`${this.url}/api/forum/getThreads`);
  }
  public postInThread(threadId:string,post:Post){
    return this.httpClient.post(`${this.url}/api/forum/postInThread/${threadId}`,post);
  }
}
