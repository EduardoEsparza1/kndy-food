import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/login/account.service'


@Component({
  selector: 'app-login',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @Input() action: string;

  constructor(
    public accountService: AccountService,
    public router: Router
  ) { }

  ngOnInit() {
  
  }

}
