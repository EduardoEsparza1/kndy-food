import { Component, OnInit, Output } from '@angular/core';
import * as auth from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AccountService } from '../services/login/account.service';
import { GlobalService } from '../services/screenReader/global.service';
import { FirestoreService } from '../services/firestore/firestore.service'

import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  validarSpeak: GlobalService; 
  carrito: any = []
  total: 0

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
    if(this.carrito[i].data.producto.data.existencia > this.carrito[i].data.cantidad) {
      this.carrito[i].data.cantidad++
      this.firestoreService.updateCartProduct(this.carrito[i].idCarrito, this.carrito[i].data)
      this.total += this.carrito[i].data.producto.data.precio
    }else{
      Swal.fire({
        icon: 'info',
        title: 'Alto...',
        text: 'Lo sentimos, no hay más productos!',
      })
    }
  }

  restProductCant(i: number) {
    if(this.carrito[i].data.cantidad > 1) {
      this.carrito[i].data.cantidad--
      this.firestoreService.updateCartProduct(this.carrito[i].idCarrito, this.carrito[i].data)
      this.total -= this.carrito[i].data.producto.data.precio
    } else {
      this.dropFromCart(i)
    }
  }

  dropFromCart(i: number) {
    this.firestoreService.dropCart(this.carrito[i].idCarrito)
  }

  habilitarSpeak(){
    this.global.band=!this.global.band; 
  }
  
  getUserCart() {
    if(this.accountService.uid != null) {
      this.firestoreService.getCart(this.accountService.uid).subscribe(cartSnapshot => {
        this.carrito = []
        this.total = 0
          cartSnapshot.forEach((cartData: any) => {
            let product = cartData.payload.doc
            this.total += product.data().cantidad*product.data().producto.data.precio
            let data = {
              idCarrito: product.id,
              data: product.data()
            }
            this.carrito.push(data)
            }
          )
        

      })
    }
  }

  newPedido() {
    let data = []
    let f = new Date()
    let fecha = f.getDate() + '/' + (f.getMonth() + 1) + '/' + f.getFullYear()

    this.carrito.forEach(element => {
      let producto = element.data.producto
      console.log(producto)
      producto.data.existencia -= element.data.cantidad
      this.firestoreService.updateProducto(producto.id, producto.data)
      data.push(element)
      this.firestoreService.deleteCart(element.idCarrito)
    });
    let values = {data: data, uid: this.accountService.uid, fecha: fecha}
    this.firestoreService.addPedido(values).then(() => {
      $('#closeCartModal').click()
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Suuuuper...',
        text: 'Tu pedido ha sido apartado!',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

}
