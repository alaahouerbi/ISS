import { Component, OnInit } from '@angular/core';
import { FormBuilder,ReactiveFormsModule  } from '@angular/forms';
import {AuthService} from '../../shared/services';
import { Router } from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  loginForm;
  UserCred={};

  constructor(private FormBuilder:FormBuilder,private authService:AuthService) { }
  onSubmit(userCred){
    console.log(userCred);
    this.authService.login(userCred);


  }

}
