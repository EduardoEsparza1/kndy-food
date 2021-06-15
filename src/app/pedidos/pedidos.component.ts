import { compileNgModule } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { __awaiter } from 'tslib';
import { FirestoreService } from '../services/firestore/firestore.service';
import { AccountService } from '../services/login/account.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  pedidos: any

  constructor(
    private firestoreService: FirestoreService,
    private accountService: AccountService
    ) { }

  ngOnInit(): void {
    
    this.pedidos = []
    
    this.firestoreService.getPedidos(this.accountService.uid).subscribe(pedidoSnapshot => {
      pedidoSnapshot.forEach(pedido => {

        let apartado = pedido.payload.doc.data()

        let data = {fecha: apartado['fecha'], data: apartado['data']}

        this.pedidos.push(data)
        console.log(data)
      })
    })

  }

}
