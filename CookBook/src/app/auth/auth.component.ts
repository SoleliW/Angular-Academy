import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) { 
    if (!form.valid) {
      return;
    }
    const password = form.value.password;
    const email = form.value.email;

    this.isLoading = true;
    if(this.isLoginMode) {
      // ...
    } else {
      this.authService.signup(email, password).subscribe(res => {
        console.log(res);
        this.isLoading = false;
      }, 
      error => {
        console.log(error);
        this.error = 'ERROR'
        this.isLoading = false;
      }
      );
    }
    form.reset();
  }

}
