import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})

export class ToDoComponent implements OnInit {

  title = '';
  content = '';
  created = new Date();
  isCompleted = false;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    console.log('Init');
    console.log(this);
  }

  onSubmit(): void {

    const postData: ToDoModel = {
      id: 0,
      title: this.title,
      content: this.content,
      created: this.created,
      isCompleted: this.isCompleted
    };

    const headers: HttpHeaders = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    this.http.post<ToDoModel>('https://localhost:7141/api/to-do', postData, { headers: headers }).subscribe(
      result =>
      {
        let snackBarRef = this.snackBar;
        if (result != null) {
          snackBarRef.open(`To do with title '${this.title}' successfully created.`);
        }
        else {
          snackBarRef.open(`To do with title '${this.title}' didn't create.`);
        }
      },
      error => console.error(error));

  }

  cancel(): void {
    this.title = '';
    this.content = '';
    this.created = new Date();
    this.isCompleted = false;
  }

}

interface ToDoModel {
  id?: number,
  title: string,
  content: string,
  created: Date,
  isCompleted: boolean
}
