import { Component, OnInit } from '@angular/core';
import * as auth from 'firebase/app'
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AccountService } from '../services/login/account.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public auth: AngularFireAuth,
    public accountService: AccountService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

}
