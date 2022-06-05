import { HttpClient, HttpHeaders, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Constants } from '../../app/config/constants';
import { LoginModel } from '../../models/login-model';
import { RegisterModel } from '../../models/register-model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isAuthenticated: boolean = JSON.parse(localStorage.getItem('loggedIn') || 'false');

  private apiUrl: string = this.constants.WEB_API_BASE_URL + this.constants.API_ACCOUNT_ENDPOINT;

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar, private constants: Constants) {}

  register(registerModel: RegisterModel): void {
    const headers: HttpHeaders = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    this.http.post<RegisterModel>(this.apiUrl + '/register', registerModel, { headers: headers, observe: 'response' })
      .subscribe(result => {
        if (result.status == HttpStatusCode.Ok) {
          this.router.navigate(['/login']);
        }
        else {
          let snackBarRef = this.snackBar;
          snackBarRef.open(`Registration failed!`);
        }
      },
        error => console.error(error));
  }

  login(loginModel: LoginModel): void {
    const headers: HttpHeaders = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    this.http.post<LoginModel>(this.apiUrl + '/login', loginModel, { headers: headers, observe: 'response' })
      .subscribe(result => {
        if (result.status == HttpStatusCode.Ok) {
          localStorage.setItem('loggedIn', 'true');
          this.router.navigate(['/']);
        }
        else {
          let snackBarRef = this.snackBar;
          snackBarRef.open(`Login failed!`);
        }
      },
        error => console.error(error));
  }

  logout(): void {
    const headers: HttpHeaders = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    this.http.post<HttpResponse<void>>(this.apiUrl + '/logout', null, { headers: headers, observe: 'response' })
      .subscribe(result => {
        if (result.status == HttpStatusCode.Ok) {
          localStorage.setItem('loggedIn', 'false');
          this.router.navigate(['/']);
        }
        else {
          let snackBarRef = this.snackBar;
          snackBarRef.open(`Logout failed!`);
        }
      },
        error => console.error(error));
  }

  isUserAuthenticated(): boolean {
    return JSON.parse(localStorage.getItem('loggedIn') || this.isAuthenticated.toString());
  }

}
