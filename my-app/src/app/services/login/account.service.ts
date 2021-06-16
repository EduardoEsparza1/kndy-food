import { Injectable } from '@angular/core';
import { OnInit, AfterViewInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as auth from 'firebase/app';

import Swal from 'sweetalert2';
declare var $: any;

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

  method = "correo"
  isAdmin: boolean;

  categoria: string;
  idCategoria: number;

  uid: string;

  triedRegister: boolean

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

  isAdminUser() {
    this.auth.user.subscribe((user)=>{
      if(user) {
        this.uid = user.uid
        this.isAdmin = user!=null && user.email == "admin@kndyfood.com"
        $('#eventBtn').click()
      }
    })
  }

  customLogin() {
    this.auth.signInWithEmailAndPassword(this.email, this.pass)
    .then( res => {
      console.log(res)
      this.cleanForms()
      this.isAdminUser()
      Swal.fire('Custom Login')
      this.router.navigate(['home'])
    })
    .catch( err => {
      console.log("Error cl: ", err)
      Swal.fire('Error')
    })
  }

  logout() {
    this.auth.signOut();
    this.router.navigate(['home'])
    this.isAdmin = false
    this.uid = null
    $('#eventBtn').click()
  }

  register(form) {
      this.auth.createUserWithEmailAndPassword(form.correo, form.password)
      .then(user => {
        this.auth.currentUser.then(srs =>{
          srs.updateProfile({
            displayName: form.nombre
          })
          this.cleanForms()
        })
        console.log(user)
        this.isAdminUser()
        Swal.fire('Register')
        this.router.navigate(['home'])
      })
      .catch(err => {
        console.log("Error user: ", err)
      })

  }

  showSMS() {
    this.method = "sms"
  }

  showCorreo() {
    this.method = "correo"
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
