import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    console.log('Init');
    console.log(this);
  }

  onSubmit(): void {
    console.log('Form data submited >>');

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
        if (result != null) {
          alert('To do successfully added in database.');
        }
        else {
          alert('To do did not added in database.');
        }
      },
      error => console.error(error));

    console.log('Form data submited <<');
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
