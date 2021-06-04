import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  authForm = new FormGroup({
    "email": new FormControl("", [Validators.required, Validators.email]),
    "password": new FormControl("", [Validators.required, Validators.minLength(6)]),
});

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() { 
    if (!this.authForm.valid) {
      return;
    }
    const password = this.authForm.value.password;
    const email = this.authForm.value.email;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if(this.isLoginMode) {
      authObs = this.authService.login(email, password)
    } else {
      authObs = this.authService.signup(email, password)
    }

    authObs.subscribe(res => {
      console.log(res);
      this.isLoading = false;
      this.router.navigate(['/recipe']);
    }, 
    errorMessage => {
      console.log(errorMessage);
      this.error = errorMessage;
      this.isLoading = false;
    }
    );

    this.authForm.reset();
  }

}
