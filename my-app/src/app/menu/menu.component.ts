import { Component, OnInit } from '@angular/core';
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
  }

  productos = []
  //para el spinner:
  public load: Boolean = false;
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
      this.load = true;
    })

  }
  
  addToCartMenu(i: number) {
    if(this.accountService.uid == null) {//No ha iniciado sesión
      this.router.navigate(['login'])
      return
    }
    
    //Con sesión iniciada
    let data = {
      uid: this.accountService.uid,
      producto: this.productos[i],
      cantidad: 1
    }
    console.log(data)
    this.firestoreService.addToCart(data)
  }

}
