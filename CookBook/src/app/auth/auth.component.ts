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

    if(this.isLoginMode) {
      // ...
    } else {
      this.authService.signup(email, password).subscribe(res => {
        console.log(res);
      }, error => {
        console.log(error);
      }
      );
    }
    form.reset();
  }

}
