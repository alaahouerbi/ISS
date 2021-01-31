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
  }// redirect to home if already logged in

  ngOnInit(): void {
    if (this.authService.getCurrentUser) {
      console.log(this.authService.getCurrentUser);

      this.router.navigate(['/home']);
    }
    this.registerForm = this.formBuilder.group({
      email : '',
      password : '',
      firstName : '',
      lastName : '',
    });
  }
  onSubmit(){

    this.authService.register(this.registerForm.value).pipe(first())
    .subscribe(
        data => {

            this.router.navigate(['/home']);
        },
        error => {
          console.log(error);

        });;
  }
}
