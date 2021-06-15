import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../services/message/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @Input() action: string;

  constructor(
    public router: Router,
    public _MessageService: MessageService
  ) { }

  contactForm(form) {
    this._MessageService.sendMessage(form).subscribe(() => {
    alert('Mensaje enviado correctamente');
   });
  }

  ngOnInit() {
  
  }

}