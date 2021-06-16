import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../services/message/message.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


import Swal from 'sweetalert2';

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


  public datos = new FormGroup({
    nombre: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    mensaje: new FormControl('', Validators.required),
  });

  contactForm(datos) {
    this._MessageService.sendMessage(datos).subscribe(() => {
      Swal.fire('Mensaje enviado correctamente')
   });
  }

  ngOnInit() {
  }

}
