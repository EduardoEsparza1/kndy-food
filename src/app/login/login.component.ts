import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as auth from 'firebase/app'

import firebase from 'firebase'
import { environment } from 'src/environments/environment';
import { AccountService } from '../services/login/account.service'
import { WindowService } from '../services/window/window.service'

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  name: string
  phoneNumber: string
  otp: string
  windowRef: any
  disableOTPSendBtn = true
  noSent: boolean

  constructor(
    public afAuth: AngularFireAuth,
    public accountService: AccountService,
    public router: Router,
    private windowService: WindowService
  ) {
    //firebase.initializeApp(environment.firebaseConfig)
    //auth.default.initializeApp(environment.firebaseConfig)
    this.noSent = true
  }

  ngOnInit() {
    this.windowRef = this.windowService.windowRef   

    $(document).ready(function() {
    
      $('.form-panel.two').not('.form-panel.two.active').on('click', function(e) {
        e.preventDefault();
    
        $('.form-toggle').addClass('visible');
        $('.form-panel.one').addClass('hidden');
        $('.form-panel.two').addClass('active');
      });
    
      $('.form-toggle').on('click', function(e) {
        e.preventDefault();
        $(this).removeClass('visible');
        $('.form-panel.one').removeClass('hidden');
        $('.form-panel.two').removeClass('active');
      });
    });
  }

  viewCaptha() {
    setTimeout(() => {
      this.windowRef.recaptchaVerifier = new auth.default.auth.RecaptchaVerifier('recaptcha-container', {
        size: 'normal',
        callback: response => {
          this.disableOTPSendBtn = false
        }
      })  
      this.windowRef.recaptchaVerifier.render()
    }, 0);
  }

  sendOTP() {
    alert("por enviar")
    this.afAuth.signInWithPhoneNumber(this.phoneNumber, this.windowRef.recaptchaVerifier)
      .then( confirmationResult => {
        alert("enviado")
        this.windowRef.confirmationResult = confirmationResult
        this.noSent = false
      })
  }

  verifyOTP() {
    this.windowRef.confirmationResult.confirm(this.otp)
      .then( userCredentials => {
        userCredentials.displayName = this.name
        this.afAuth.currentUser.then(user => {
          user.updateProfile({
            displayName: this.name
          })
        })
        this.accountService.method = 'correo'
        this.router.navigate(['home'])
      })
  }

}
