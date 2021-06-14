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
  carrito: any = []

  constructor(
    public auth: AngularFireAuth,
    public accountService: AccountService,
    public router: Router,
    private global: GlobalService,
    private firestoreService: FirestoreService
  ){
    this.validarSpeak=global;
  }

  ngOnInit(): void {
  }

  addProductCant(i: number) {
    if(this.carrito[i].data.existencia > this.carrito[i].cantidad) {
      this.carrito[i].cantidad++
    }
  }

  restProductCant(i: number) {
    if(this.carrito[i].cantidad > 1)
      this.carrito[i].cantidad--
    else {
      this.dropFromCart(i)
    }
  }

  dropFromCart(i: number) {
    this.firestoreService.dropCart(this.carrito[i].idCarrito)
    this.carrito.splice(i, 1)
    this.getUserCart()
  }

  habilitarSpeak(){
    this.global.band=!this.global.band; 
  }
  
  getUserCart() {
    console.log("carrito")
    this.carrito = []
    if(this.accountService.uid != null) {
      this.firestoreService.getCart(this.accountService.uid).subscribe(cartSnapshot => {

        if(cartSnapshot.length > 0) {
          let i = 0
          cartSnapshot.forEach((cartData: any) => {
            let cartProduct = cartData.payload.doc
            //Obtener datos de productos en el carrito
              this.firestoreService.getProducto(cartProduct.data().idProducto).subscribe(producto => {
                if(i < cartSnapshot.length) {
                  let datos = producto.payload
                  i=i+1
                  this.carrito.push({
                    id: datos.id,
                    data: datos.data(),
                    cantidad: cartProduct.data().cantidad,
                    idCarrito: cartProduct.id
                  })
                }
              })
            }
          )
        }

      })
    } else {
      console.log("no user found")
    }
  }

}
