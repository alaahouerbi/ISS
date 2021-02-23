import { Injectable } from '@angular/core';
import {User} from '../models/user.model';
import { Observable, BehaviorSubject } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { map, distinctUntilChanged,tap} from 'rxjs/operators';

import { Router } from '@angular/router';

const endpoint='http://localhost:3000/api/user/';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject:BehaviorSubject<User>;
  public user:Observable<User>;




  constructor(private httpClient: HttpClient,private router:Router) {
    this.userSubject = new BehaviorSubject<User>(this.getUserPayload());
    this.user = this.userSubject.asObservable();
  }
    public get userValue(): User {
        return this.userSubject.value;
    }

  login(email:string, password:string):Observable<User> {
   return this.httpClient.post<any>('http://localhost:3000/api/user/login',{email,password}).pipe(
   map(res => {
    localStorage.setItem('user',JSON.stringify(res));
    this.userSubject.next(res);
      return res;
}))
}
logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }
  getUser():any{
    return this.user;
  }
  getUserPayload(){
    if(!localStorage.getItem('user')) return ({} as User);
    const token=localStorage.getItem('user');
    console.log(token);

    return JSON.parse(token);
  }
  register(user:User){
    return this.httpClient.post(endpoint+"register",user);
  }

}
