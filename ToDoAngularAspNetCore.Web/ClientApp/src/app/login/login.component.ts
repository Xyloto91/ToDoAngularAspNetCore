import { Component, Input, OnInit } from '@angular/core';
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
  public loggedIn: boolean;
  
  constructor(private authService: AuthenticationService, private router: Router) {
    this.login = window.history.state['login'];
    this.loggedIn = true;
  }

  ngOnInit(): void {
    this.login = new LoginModel('', '');
  }

  onSubmit(): void {
    this.authService.login(this.login);
    if (!this.authService.isUserAuthenticated()) {
      this.loggedIn = false;
    }
  }

}
