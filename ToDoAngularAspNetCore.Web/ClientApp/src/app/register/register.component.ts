import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterModel } from '../../models/register-model';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() register: RegisterModel;

  constructor(private authService: AuthenticationService) {
    this.register = window.history.state['register'];
  }

  ngOnInit(): void {
    this.register = new RegisterModel('', '', '', '');
  }

  onSubmit(): void {
    this.authService.register(this.register);
  }

}
