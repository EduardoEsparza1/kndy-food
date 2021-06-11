import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as auth from 'firebase/app'

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  //Login
  email: string
  pass: string

  //Register
  nombre: string
  password: string
  password2: string
  correo: string

  //Contacto
  nombreContact: string
  correoContact: string
  mensaje:string

  method = "correo"
  isAdmin: boolean;
  constructor(
    public auth: AngularFireAuth,
    public router: Router
  ) {
    //this.comprobar()
  }

  ngOnInit(): void {
    this.comprobar()
  }

  loginWithGoogle() {
    this.auth.signInWithPopup(new auth.default.auth.GoogleAuthProvider)
    this.router.navigate(['home'])
  }

  comprobar(){
    if(this.email=='admin@kndyfood.com' && this.pass=='equipo' || this.correo=='admin@kndyfood.com'){
     this.isAdmin=true;
    }else{
      this.isAdmin=false;
    }//Corregir validación
  }

  customLogin() {
    this.auth.signInWithEmailAndPassword(this.email, this.pass)
    .then( res => {
      console.log(res)
      this.cleanForms()
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
    this.isAdmin = false
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
          this.cleanForms()
        })
        console.log(user)
        this.router.navigate(['home'])
      })
      .catch(err => {
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

  contacto() {

    if(this.nombreContact != undefined && this.correoContact != undefined ) {
      alert("correcto")
    } else {
      alert("Completa todos los campos")
    }

  }

  cleanForms() {
    //Registro
    this.correo = ""
    this.nombre = ""
    this.password = ""
    this.password2 = ""

    //Login
    this.email = ""
    this.pass = ""
  }
}
