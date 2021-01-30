import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/user.model';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  userModel:User
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}
  get f() {
    return this.registerForm.controls;
  }
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email : '',
      password : '',
      firstName : '',
      lastName : '',
    });
  }
  onSubmit(){
    this.userModel.email=this.f.email.value;
    this.userModel.password=this.f.password.value;
    this.userModel.firstName=this.f.firstName.value;
    this.userModel.lastName=this.f.lastName.value;
    this.authService.register(this.userModel).pipe(first())
    .subscribe(
        data => {

            this.router.navigate(['/login']);
        },
        error => {
          console.log(error);

        });;
  }
}
