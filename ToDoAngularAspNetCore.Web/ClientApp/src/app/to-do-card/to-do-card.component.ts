import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ToDoModel } from '../../models/to-do-model';

@Component({
  selector: 'app-to-do-card',
  templateUrl: './to-do-card.component.html',
  styleUrls: ['./to-do-card.component.css']
})
export class ToDoCardComponent implements OnInit {
  @Input() toDo?: ToDoModel;
  constructor() { }

  ngOnInit(): void {
  }

}
