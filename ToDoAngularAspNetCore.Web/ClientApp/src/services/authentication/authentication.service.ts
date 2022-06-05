import { HttpClient, HttpHeaders, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginModel } from '../../models/login-model';
import { RegisterModel } from '../../models/register-model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isAuthenticated: boolean = false;
  webApiUrl: string = '';
  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar, @Inject('WEB_API_URL') webApiUrl: string) {
    this.webApiUrl = webApiUrl;
  }

  register(registerModel: RegisterModel): void {
    const headers: HttpHeaders = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    this.http.post<RegisterModel>(this.webApiUrl + 'api/account/register', registerModel, { headers: headers, observe: 'response' })
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

    this.http.post<LoginModel>(this.webApiUrl + 'api/account/login', loginModel, { headers: headers, observe: 'response' })
      .subscribe(result => {
        if (result.status == HttpStatusCode.Ok) {
          this.isAuthenticated = true;
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

    this.http.post<HttpResponse<void>>(this.webApiUrl + 'api/account/logout', null, { headers: headers, observe: 'response' })
      .subscribe(result => {
        if (result.status == HttpStatusCode.Ok) {
          this.isAuthenticated = false;
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
    return this.isAuthenticated;
  }

}
