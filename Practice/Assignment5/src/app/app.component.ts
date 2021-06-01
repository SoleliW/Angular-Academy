import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('signupForm', { static: false }) sgnForm: NgForm;

  subscriptions = ['Basic', 'Advanced', 'Pro'];
  selectedSub = 'Advanced';
  submitted = false;

  onSubmit() {
    this.submitted = true;
    console.log(this.sgnForm.value);
    console.log('Submited: ' + this.submitted);

  }
}
