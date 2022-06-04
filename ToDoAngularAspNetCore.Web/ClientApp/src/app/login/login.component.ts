import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from '../../models/login-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() login: LoginModel;
  webApiUrl = '';

  constructor(private http: HttpClient, private router: Router, @Inject('WEB_API_URL') webApiUrl: string) {
    this.webApiUrl = webApiUrl;
    this.login = window.history.state['login'];
  }

  ngOnInit(): void {
    this.login = new LoginModel('', '');
  }

  onSubmit(): void {
    const headers: HttpHeaders = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    this.http.post<LoginModel>(this.webApiUrl + 'api/account/login', this.login, { headers: headers, observe: 'response' })
      .subscribe(result => {
        this.router.navigate(['/']);
      },
        error => console.error(error));
  }

}
