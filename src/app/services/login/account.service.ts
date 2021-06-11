import { ANALYZE_FOR_ENTRY_COMPONENTS, Injectable } from '@angular/core';
import { OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as auth from 'firebase/app'

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  @Input() action: string;
  //Login
  email: string
  pass: string

  //Register
  nombre: string
  username: string
  password: string
  password2: string
  correo: string

  method = "correo"

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
    .then( res => {
      console.log(res)
      this.router.navigate(['home'])
    })
    .catch( err => {
      console.log("Error cl: ", err)
      alert("error")
    })
  }

  logout() {
    this.auth.signOut();
    this.router.navigate(['home'])
  }

  register() {

    if(this.correo != undefined && this.password == this.password2 && this.password != undefined) {
      alert("correcto")
      this.auth.createUserWithEmailAndPassword(this.correo, this.password)
      .then(user => {
        this.auth.currentUser.then(srs =>{
          srs.updateProfile({
            displayName: this.nombre
          })
        })
        console.log(user)
        this.router.navigate(['home'])
      })
      .catch(err => {
        alert("No weeeeeeeeeeeeeeeeeeee")
        console.log("Error user: ", err)
      })
    } else {
      alert("mal")
    }

  }

  showSMS() {
    this.method = "sms"
  }

  showCorreo() {
    this.method = "correo"
  }
}
