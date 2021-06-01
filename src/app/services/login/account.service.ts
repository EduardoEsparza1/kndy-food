import { Injectable } from '@angular/core';
import { OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as auth from 'firebase/app'

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  @Input() action: string;
  email: string
  pass: string

  constructor(
    public auth: AngularFireAuth,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  loginWithGoogle() {
    this.auth.signInWithPopup(new auth.default.auth.GoogleAuthProvider)
    this.router.navigate(['home'])
  }

  customLogin() {
    this.auth.signInWithEmailAndPassword(this.email, this.pass)
    .then( res => console.log(res))
    .catch( err => console.log("Error cl: ", err))
    this.router.navigate(['home'])
  }

  logout() {
    this.auth.signOut();
    this.router.navigate(['home'])
  }

  register() {
    this.auth.createUserWithEmailAndPassword(this.email, this.pass)
    .then(user => console.log(user))
    .catch(err => console.log("Error user: ", err))
    //this.router.navigate(['profile'])
  }
}
