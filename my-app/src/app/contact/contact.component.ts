import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../services/message/message.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../services/login/account.service';


import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @Input() action: string;

  triedDatos: boolean

  constructor(
    public router: Router,
    public _MessageService: MessageService,
    public accountService: AccountService
  ) { }

  public datosForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    mensaje: new FormControl('', Validators.required),
  });

  
  contactForm(datosForm) {
   this.triedDatos = true
    if(this.datosForm.valid) {
      this._MessageService.sendMessage(datosForm).subscribe(() => {
        Swal.fire('Mensaje enviado correctamente')
      });
      
      this.triedDatos = false
    }
  }

  ngOnInit() {
  }

}
