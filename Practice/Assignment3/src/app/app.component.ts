import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Assignment3';

  secret ='Tuna';
  newPassword=false;
  passwordCreated = 'No new Password created.'
  log = [];

  onNewPassword(){
    this.newPassword= !this.newPassword;
    // this.log.push(this.log.length + 1)
    this.log.push(new Date())

    this.passwordCreated = 'New Password: ' + this.secret;
  }
}
