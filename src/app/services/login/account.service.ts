import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as auth from 'firebase/app'
import { isError } from 'util';

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

  categoria: string;
  idCategoria: number;


  constructor(
    public auth: AngularFireAuth,
    public router: Router
  ) {
    this.isAdminUser()
    this.idCategoria = 1
    this.categoria = 'pasteles'
  }

  ngOnInit(): void {
    
  }

  cambioCategoria(cat){
    if(cat == 1){
      this.categoria = 'pasteles';
      
    } else if(cat == 2){
      this.categoria = 'gelatinas';
    }
    else this.categoria = 'galletas';

    this.idCategoria = cat
  }


  loginWithGoogle() {
    this.auth.signInWithPopup(new auth.default.auth.GoogleAuthProvider)
    this.router.navigate(['home'])
  }

  isAdminUser(){
    
    this.auth.user.subscribe((user)=>{
      this.isAdmin = user!=null && user.email == "admin@kndyfood.com"
    })

  }

  customLogin() {
    this.auth.signInWithEmailAndPassword(this.email, this.pass)
    .then( res => {
      console.log(res)
      this.cleanForms()
      this.isAdminUser()
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
        this.isAdminUser()
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
