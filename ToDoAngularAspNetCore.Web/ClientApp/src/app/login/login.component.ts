import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from '../../models/login-model';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() login: LoginModel;

  constructor(private authService: AuthenticationService) {
    this.login = window.history.state['login'];
  }

  ngOnInit(): void {
    this.login = new LoginModel('', '');
  }

  onSubmit(): void {
    this.authService.login(this.login);
  }

}
