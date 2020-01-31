import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { map } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { UserInterface } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private afsAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {}

  registerUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.createUserWithEmailAndPassword(email, pass).then(
        userData => resolve(userData),
        err => reject(err)
      );
    });
  }

  loginEmailUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.signInWithEmailAndPassword(email, pass).then(
        userData => resolve(userData),
        err => reject(err)
      );
    });
  }

  isAuth() {
    return this.afsAuth.user;
  }

  logoutUser() {
    return this.afsAuth.auth.signOut();
  }
}
