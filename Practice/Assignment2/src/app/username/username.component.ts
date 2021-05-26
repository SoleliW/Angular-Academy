import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.css']
})
export class UsernameComponent implements OnInit {
  username = '';
  constructor() { 
    
  }

  ngOnInit(): void {
  }

  onCreateUsername(event:Event){
    this.username = (<HTMLInputElement>event.target).value;
  }

  onClearUsername(){
    this.username = "";
    // return "Input cleared!"
  }
}
