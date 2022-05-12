import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToDoModel } from '../../models/to-do-model';
import { Input } from '@angular/core';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})

export class ToDoComponent implements OnInit {
  @Input() toDo: ToDoModel;

  webApiUrl = '';

  constructor(private http: HttpClient, private snackBar: MatSnackBar, @Inject('WEB_API_URL') webApiUrl: string) {
    this.webApiUrl = webApiUrl;
    this.toDo = window.history.state['toDo'];
  }

  ngOnInit(): void {
    if (!this.toDo) {
      this.toDo = new ToDoModel('', '', new Date(), false);
    }
  }

  onSubmit(): void {

    const headers: HttpHeaders = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    if (this.toDo.id) {
      this.http.put<ToDoModel>(this.webApiUrl + 'api/to-do', this.toDo, { headers: headers }).subscribe(
        result => {
          let snackBarRef = this.snackBar;
          if (result != null) {
            snackBarRef.open(`To do with title '${this.toDo?.title}' successfully updated.`);
          }
          else {
            snackBarRef.open(`To do with title '${this.toDo?.title}' didn't updated.`);
          }
        },
        error => console.error(error));
    }
    else {
      this.http.post<ToDoModel>(this.webApiUrl + 'api/to-do', this.toDo, { headers: headers }).subscribe(
        result => {
          let snackBarRef = this.snackBar;
          if (result != null) {
            snackBarRef.open(`To do with title '${this.toDo?.title}' successfully created.`);
          }
          else {
            snackBarRef.open(`To do with title '${this.toDo?.title}' didn't create.`);
          }
        },
        error => console.error(error));
    }
  }
}
