import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { ToDoModel } from '../../models/to-do-model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Constants } from '../config/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public toDos: ToDoModel[] | null = [];

  private apiUrl: string = this.constants.WEB_API_BASE_URL + this.constants.API_TO_DO_ENDPOINT;

  constructor(private http: HttpClient, public authService: AuthenticationService, private snackBar: MatSnackBar, private constants: Constants) {}

  ngOnInit(): void {
    const headers: HttpHeaders = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    this.http.get<ToDoModel[]>(this.apiUrl, { headers: headers, observe: 'response' }).subscribe(result => {
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
