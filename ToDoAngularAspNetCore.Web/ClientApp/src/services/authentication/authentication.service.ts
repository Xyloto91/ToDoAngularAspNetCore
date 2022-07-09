import { HttpClient, HttpHeaders, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Constants } from '../../app/config/constants';
import { LoginModel } from '../../models/login-model';
import { RegisterModel } from '../../models/register-model';
import { UserModel } from '../../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private user: UserModel = new UserModel(0, "");

  private apiUrl: string = this.constants.WEB_API_BASE_URL + this.constants.API_ACCOUNT_ENDPOINT;

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar, private constants: Constants) {}

  ngOnInit(): void {
    localStorage.setItem('loggedIn', 'false');
    }

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

  public login(loginModel: LoginModel) {

    return new Observable(observer => {
      const headers: HttpHeaders = new HttpHeaders();
      headers.set('Content-Type', 'application/json');

      this.http.post<UserModel>(this.apiUrl + '/login', loginModel, { headers: headers, observe: 'response', withCredentials: true })
        .subscribe(result => {
          if (result.status == HttpStatusCode.Ok) {
            this.user = new UserModel(result.body?.id || 0, result.body?.email || "");
            this.router.navigate(['/']);
          }
          else {
            let snackBarRef = this.snackBar;
            snackBarRef.open(`Login failed!`);
          }
        },
          error => console.error(error));
    });
  }

  logout(): void {
    const headers: HttpHeaders = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    this.http.post<HttpResponse<void>>(this.apiUrl + '/logout', null, { headers: headers, observe: 'response' })
      .subscribe(result => {
        if (result.status == HttpStatusCode.Ok) {
          this.user = new UserModel(0, "");
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
    return this.user && this.user.id > 0;
  }

  getCurrentUserId(): number{
    return this.user.id || 0;
  }

}
