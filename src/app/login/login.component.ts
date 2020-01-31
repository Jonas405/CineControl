import { Component, OnInit, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  rememberMe = false;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService
  ) {}
  public email = '';
  public password = '';
  wrong = false;
  ngOnInit() {}

  onLogIn(f: NgForm): void {
    this.authService
      .loginEmailUser(this.email, this.password)
      .then(res => {
        this.onLoginRedirect();
      })
      .catch(err => {
        console.log('err', err.message);
        this.wrong = true;
      });
  }

  onLoginRedirect(): void {
    this.router.navigate(['/cinema']);
  }
}
