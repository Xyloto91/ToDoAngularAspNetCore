import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Inject } from '@angular/core';
import { ToDoModel } from '../../models/to-do-model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  public toDos: ToDoModel[] | null = [];

  constructor(http: HttpClient, private snackBar: MatSnackBar, @Inject('WEB_API_URL') baseUrl: string) {
    const headers: HttpHeaders = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    http.get<ToDoModel[]>(baseUrl + 'api/to-do', { headers: headers, observe: 'response' }).subscribe(result => {
      if (result) {
        if (result.status == 200) {
          this.toDos = result.body;
        }
        else {
          let snackBarRef = this.snackBar;
          snackBarRef.open(`Couldn't get all to dos.`);
        }
      }
    },
      error => console.error(error));
  }
}
