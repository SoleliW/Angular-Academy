import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidator } from './custom-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  selectStatus = ['Stable', 'Critical', 'Finished'];

  projectForm: FormGroup;

  ngOnInit() {
    this.projectForm = new FormGroup({
      'projectName': new FormControl(null, [Validators.required, CustomValidator.invalidName], CustomValidator.asynInvalidName),
      'email': new FormControl(null, [Validators.required,Validators.email]),
      'status': new FormControl('Critical')
    });
  }

  onSave() {
    console.log(this.projectForm.value);
  }
}
