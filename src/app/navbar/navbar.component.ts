import { Component, OnInit, Output } from '@angular/core';
import * as auth from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AccountService } from '../services/login/account.service';
import { GlobalService } from '../services/screenReader/global.service';
import { FirestoreService } from '../services/firestore/firestore.service'

declare var $: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  validarSpeak: GlobalService; 
  carrito = []

  constructor(
    public auth: AngularFireAuth,
    public accountService: AccountService,
    public router: Router,
    private global: GlobalService,
    private firestoreService: FirestoreService
  ){
    this.validarSpeak=global;
    
    if(this.accountService.isAdminUser() != null) {
      this.firestoreService.getCart(this.accountService.uid).subscribe(cartSnapshot => {

        if(cartSnapshot.length > 0) {
          cartSnapshot.forEach((cartData: any) => {
            let cartProduct = cartData.payload.doc
            //Obtener datos de productos en el carrito
              this.firestoreService.getProducto(cartProduct.data().idProducto).subscribe(producto => {
                let datos = producto.payload
                this.carrito.push({
                  id: datos.id,
                  data: datos.data()
                })
                //console.log(this.carrito)
              })
              /*this.carrito.push({
                id: user.id,
                data: user.data()
              })*/
            })
        }

      })
    } else {
      console.log("no user found")
    }
  }

  ngOnInit(): void {
    
  }
  
  habilitarSpeak(){
    this.global.band=!this.global.band; 
  }
  
}
