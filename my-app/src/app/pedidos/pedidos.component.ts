import { compileNgModule } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { __awaiter } from 'tslib';
import { FirestoreService } from '../services/firestore/firestore.service';
import { AccountService } from '../services/login/account.service';
import { CodigoqrService } from '../services/codigoQR/codigoqr.service'

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  pedidos: any
  totalGastado: number
  public load: Boolean = false;

  constructor(
    private firestoreService: FirestoreService,
    public accountService: AccountService,
    private codigoqr: CodigoqrService
    ) { }

  ngOnInit(): void {
    this.pedidos = [];
    this.totalGastado = 0

    this.firestoreService.getPedidos(this.accountService.uid).subscribe((pedidoSnapshot) => {
      pedidoSnapshot.forEach((pedido) => {
        let apartado = pedido.payload.doc.data();

        let data = { fecha: apartado['fecha'], data: apartado['data'] };

        this.pedidos.push(data);

      });
      this.load = true;
    });

    this.codigoqr.getDatosPedidos().forEach((pedido: any) => {
      
      pedido.forEach(element => {
        element.data.forEach(producto => {
          let cantidad = producto.data.cantidad
          let precio = producto.data.producto.data.precio
          this.totalGastado += cantidad * precio
        });
      });
      
    })

  }

}
