import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ToDoModel } from '../../models/to-do-model';

@Component({
  selector: 'app-to-do-detail',
  templateUrl: './to-do-detail.component.html',
  styleUrls: ['./to-do-detail.component.css']
})
export class ToDoDetailComponent implements OnInit {
  @Input() toDo?: ToDoModel;
  constructor() { }

  ngOnInit(): void {
  }

}
