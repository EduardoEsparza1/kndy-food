import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from '../services/firestore/firestore.service';
import { AccountService } from '../services/login/account.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    public accountService: AccountService,
    private firestoreService: FirestoreService,
    private router: Router
    ) {
      alert("xd")
  }

  productos = []

  ngOnInit(): void {
    this.firestoreService.getProductos().subscribe(productsSnapshot => {
      this.productos = []
      productsSnapshot.forEach((productData: any) => {
        let product = productData.payload.doc
        this.productos.push({
          id: product.id,
          data: product.data()
        })

      })
    })

  }
  
  addToCart(documentId) {
    if(this.accountService.uid == null) {//No ha iniciado sesión
      this.router.navigate(['login'])
      return
    }
    //Con sesión iniciada
    let data = {
      uid:this.accountService.uid,
      idProducto: documentId,
      cantidad: 1
    }

    this.firestoreService.addToCart(data)
    alert("uid: " + this.accountService.uid + ", idProducto: " + documentId)
  }

}
