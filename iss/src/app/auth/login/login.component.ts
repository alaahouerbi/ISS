import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userModel = {
    email: '',
    password: '',
  };

  returnUrl: string;
  loginForm: FormGroup;
  submitted = false;
  constructor(
    private authService: AuthService,
    private router: Router, private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    // redirect to home if already logged in
    if (JSON.stringify(this.authService.userValue)!=='{}'&&(JSON.stringify(this.authService.userValue)!=='null')) {
      console.log(JSON.stringify(this.authService.userValue));

      console.log(this.authService.userValue);

      this.router.navigate(['/home']);
    }
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }
  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/login';
    this.loginForm = this.formBuilder.group({
      email: '',
      password: '',
    });
  }
  onSubmit() {
    this.userModel.email =this.f.email.value;
    this.userModel.password=this.f.password.value;
    this.authService.login(this.userModel.email,this.userModel.password).pipe(first())
    .subscribe(
        data => {
            this.router.navigate([this.returnUrl]);
        },
        error => {
           console.log(error);

        });

  }
  register(){
    this.router.navigate(['/register'])
  }
}
