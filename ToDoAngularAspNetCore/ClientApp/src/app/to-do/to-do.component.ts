import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {

  title = '';
  content = '';
  created = new Date();
  isResolved = false;

  constructor() { }

  ngOnInit(): void {
    console.log('Init');
    console.log(this);
  }

  onSubmit(): void {
    console.log('Form data submited');
    console.log(this);
  }

  cancel(): void {
    this.title = '';
    this.content = '';
    this.created = new Date();
    this.isResolved = false;
  }

}
