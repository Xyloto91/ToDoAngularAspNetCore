import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Inject } from '@angular/core';
import { ToDoModel } from '../../models/to-do-model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public toDos: ToDoModel[] | null = [];
  private baseUrl: string;

  constructor(private http: HttpClient, public authService: AuthenticationService, private snackBar: MatSnackBar, @Inject('WEB_API_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  ngOnInit(): void {
    const headers: HttpHeaders = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    this.http.get<ToDoModel[]>(this.baseUrl + 'api/to-do', { headers: headers, observe: 'response' }).subscribe(result => {
        if (result) {
          if (result.status == HttpStatusCode.Ok) {
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
