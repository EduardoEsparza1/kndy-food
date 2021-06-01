import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as auth from 'firebase/app'
import { AccountService } from '../services/login/account.service'

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() action: string;
  email: string
  pass: string

  constructor(
    //public auth: AngularFireAuth,
    public accountService: AccountService,
    public router: Router
  ) { }

  ngOnInit() {
    $(document).ready(function() {
      var panelOne = $('.form-panel.two').height(),
        panelTwo = $('.form-panel.two')[0].scrollHeight;
    
      $('.form-panel.two').not('.form-panel.two.active').on('click', function(e) {
        e.preventDefault();
    
        $('.form-toggle').addClass('visible');
        $('.form-panel.one').addClass('hidden');
        $('.form-panel.two').addClass('active');
        $('.form').animate({
          'height': panelTwo
        }, 200);
      });
    
      $('.form-toggle').on('click', function(e) {
        e.preventDefault();
        $(this).removeClass('visible');
        $('.form-panel.one').removeClass('hidden');
        $('.form-panel.two').removeClass('active');
        $('.form').animate({
          'height': panelOne
        }, 200);
      });
    });
  }
}
