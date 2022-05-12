import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject } from '@angular/core';
import { ToDoModel } from '../../models/to-do-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  public toDos: ToDoModel[] = [];

  constructor(http: HttpClient, @Inject('WEB_API_URL') baseUrl: string) {
    const headers: HttpHeaders = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    http.get<ToDoModel[]>(baseUrl + 'api/to-do', { headers: headers }).subscribe(result => {
      this.toDos = result;
    },
      error => console.error(error));
  }
}
