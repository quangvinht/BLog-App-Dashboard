import { Injectable } from '@angular/core';
import { Component, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedInGuard: boolean = false;
  constructor(
    private auth: Auth,
    private toastr: ToastrService,
    private router: Router
  ) {}

  login(email: string, password: string): void {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in

        const user = userCredential.user;
        //save use info into local storage:
        localStorage.setItem('user', JSON.stringify(user));
        this.loggedIn.next(true);
        this.isLoggedInGuard = true;

        this.toastr.success('Logged In successfully');
        this.router.navigate(['/']);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.toastr.warning(errorMessage);
      });
  }

  register(email: string, password: string): void {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  loadUser(): void {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;

        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }

  logOut(): void {
    signOut(this.auth).then(() => {
      this.toastr.success('User logout successfully');
      localStorage.removeItem('user');
      this.loggedIn.next(false);
      this.isLoggedInGuard = false;

      this.router.navigate(['/login']);
    });
  }

  isLoggedIn(): any {
    return this.loggedIn.asObservable();
  }
}
