import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as auth from 'firebase/app';

import firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { AccountService } from '../services/login/account.service';
import { WindowService } from '../services/window/window.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  name: string;
  phoneNumber: string;
  otp: string;
  windowRef: any;
  wrongCaptcha = true;
  noSent: boolean;
  nombre = ''

  triedRegister: boolean;
  triedCustomLogin: boolean;
  triedSMSLogin: boolean;

  public newRegisterForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    password: new FormControl('',Validators.compose([Validators.required, Validators.minLength(6)])),
    password2: new FormControl('',Validators.compose([Validators.required, Validators.minLength(6)])),
    correo: new FormControl('',Validators.compose([Validators.required, Validators.email]))
  });

  public newCustomLoginForm = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    pass: new FormControl('', Validators.required)
  });

  public newSMSLoginForm: any

  constructor(
    public afAuth: AngularFireAuth,
    public accountService: AccountService,
    public router: Router,
    private windowService: WindowService
  ) {
    this.noSent = true;
  }

  ngOnInit() {
    this.windowRef = this.windowService.windowRef;

    $(document).ready(function () {
      $('.form-panel.two')
        .not('.form-panel.two.active')
        .on('click', function (e) {
          e.preventDefault();

          $('.form-toggle').addClass('visible');
          $('.form-panel.one').addClass('hidden');
          $('.form-panel.two').addClass('active');
        });

      $('.form-toggle').on('click', function (e) {
        e.preventDefault();
        $(this).removeClass('visible');
        $('.form-panel.one').removeClass('hidden');
        $('.form-panel.two').removeClass('active');
      });
    });
  }

  viewCaptha() {
    this.createSMS()
    setTimeout(() => {
      this.windowRef.recaptchaVerifier =
        new auth.default.auth.RecaptchaVerifier('recaptcha-container', {
          size: 'normal',
          callback: (response) => {
            this.wrongCaptcha = false;
            console.log(this.wrongCaptcha)
          },
        });
      this.windowRef.recaptchaVerifier.render();
    }, 0);
  }

  sendOTP(form) {
    if(this.newSMSLoginForm.valid && !this.wrongCaptcha){
      Swal.fire('Por enviar');
      this.afAuth.signInWithPhoneNumber(form.phoneNumber, this.windowRef.recaptchaVerifier)
      .then((confirmationResult) => {
        this.wrongCaptcha = true
        this.triedSMSLogin = false
        this.nombre = form.name
        this.newSMSLoginForm.setValue({
          name: '',
          phoneNumber: ''
        })
        Swal.fire('Enviado');
        this.windowRef.confirmationResult = confirmationResult;
        this.noSent = false;
      });
    }
  }

  verifyOTP() {
    this.windowRef.confirmationResult.confirm(this.otp).then((userCredentials) => {
        userCredentials.displayName = this.nombre;
        this.afAuth.currentUser.then((user) => {
          user.updateProfile({
            displayName: this.nombre,
          });
          this.otp = '';
          this.wrongCaptcha = true;
        });
        this.accountService.method = 'correo';
        this.router.navigate(['home']);
      });
  }

  validateRegister(form) {
    this.triedRegister = true;
    //After proccess
    if (this.newRegisterForm.valid) {
      this.accountService.register(form);
      this.triedRegister = false;
    }
  }

  customLogin(form) {
    this.triedCustomLogin = true;
    if (this.newCustomLoginForm.valid) {
      this.accountService.customLogin(form);
      this.triedCustomLogin = false;
    }
  }

  SMSLogin(form){
    this.triedSMSLogin = true;
    if(this.newSMSLoginForm.valid){
      this.sendOTP(form)
      this.triedSMSLogin = false;
    }
  }

  createSMS(){
    this.newSMSLoginForm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      phoneNumber: new FormControl('', Validators.compose([Validators.required, Validators.minLength(13)]))
    });
  }
}
