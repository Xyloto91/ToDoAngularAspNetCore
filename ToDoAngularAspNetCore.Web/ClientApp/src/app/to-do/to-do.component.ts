import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToDoModel } from '../../models/to-do-model';
import { Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})

export class ToDoComponent implements OnInit {
  @Input() toDo: ToDoModel;

  webApiUrl = '';

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router, @Inject('WEB_API_URL') webApiUrl: string) {
    this.webApiUrl = webApiUrl;
    this.toDo = window.history.state['toDo'];
  }

  ngOnInit(): void {
    if (!this.toDo) {
      this.toDo = new ToDoModel('', '', new Date(), false, undefined);
    }
  }

  onSubmit(): void {
    const headers: HttpHeaders = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    if (this.toDo.id) {
      this.http.put<ToDoModel>(this.webApiUrl + 'api/to-do', this.toDo, { headers: headers }).subscribe(
        result => {
          let snackBarRef = this.snackBar;
          snackBarRef.open(`To do with title '${this.toDo?.title}' successfully updated.`);
        },
        error => console.error(error));
    }
    else {
      this.http.post<ToDoModel>(this.webApiUrl + 'api/to-do', this.toDo, { headers: headers }).subscribe(
        result => {
          let snackBarRef = this.snackBar;
          snackBarRef.open(`To do with title '${this.toDo?.title}' successfully created.`);
          this.router.navigate(['/']);
        },
        error => console.error(error));
    }
  }

  onDelete(): void {
    const headers: HttpHeaders = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    this.http.delete<ToDoModel>(this.webApiUrl + 'api/to-do/' + this.toDo.id, { headers: headers }).subscribe(
      result => {
        this.router.navigate(['/']);
      },
      error => console.error(error));
  }

  setCompletedDate(): void {
    if (this.toDo.isCompleted) {
      this.toDo.completedDate = new Date();
    }
    else {
      this.toDo.completedDate = undefined;
    }
  }
}
