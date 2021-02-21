import { Injectable } from '@angular/core';
import {User} from '../models/user.model';
import { Observable, BehaviorSubject } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { JwtService } from './jwt.service';

const endpoint='http://localhost:3000/api/user/';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject:BehaviorSubject<User>;
  private currentUser:Observable<User>;
  private auth: boolean;



  constructor(private httpClient: HttpClient,private jwtService: JwtService) {
    this.auth = false;
    this.currentUserSubject = new BehaviorSubject<User>({} as User);
    this.currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());
  }
  login(credentials:any):Observable<User>{
    return this.httpClient.post('http://localhost:3000/api/user/login',credentials).pipe(map(
      (res: any) => {
        this.setAuth(res);
        return res;
      }
    ));
  }
  getUser():any{
    return this.currentUser;
  }
  setUser(user: User) {
    console.log('Set user', user);
    this.currentUserSubject.next(user);
  }

  setAuth(user: User) {
    this.jwtService.setToken(user.token);
    this.setUser(user);
    this.auth = true;
  }
  public get getCurrentUser(): User {
    return this.currentUserSubject.value;
  }
  purgeAuth() {
    console.log('Session has been purged');
    this.jwtService.deleteToken();
    this.currentUserSubject.next({} as User);
    this.auth = false;
  }
  register(user:User){
    return this.httpClient.post(endpoint+"register",user);
  }
   getCurrentUserObs(): Observable<User> {
    return this.currentUser;
  }

  getUserPayload() {
    if (this.jwtService.getToken()) {
      this.getUser().subscribe({
        next: (res: any) => {
          this.setAuth(res);
        },
        error: (err) => {
          this.purgeAuth();
        }
      });
    } else {
      this.purgeAuth();
    }
  }
}
