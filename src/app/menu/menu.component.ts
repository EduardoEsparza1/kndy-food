import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
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
    private firestoreService: FirestoreService
    ) {
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
  
  
  

}
