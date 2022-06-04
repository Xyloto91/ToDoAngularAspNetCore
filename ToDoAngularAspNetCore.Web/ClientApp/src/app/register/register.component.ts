import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterModel } from '../../models/register-model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() register: RegisterModel;
  webApiUrl = '';

  constructor(private http: HttpClient, private router: Router, @Inject('WEB_API_URL') webApiUrl: string) {
    this.webApiUrl = webApiUrl;
    this.register = window.history.state['register'];
  }

  ngOnInit(): void {
    this.register = new RegisterModel('', '');
  }

  onSubmit(): void {
    const headers: HttpHeaders = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    this.http.post<RegisterModel>(this.webApiUrl + 'api/account/register', this.register, { headers: headers, observe: 'response' })
             .subscribe(result => {
                  this.router.navigate(['/login']);
      },
      error => console.error(error));
  }

}
