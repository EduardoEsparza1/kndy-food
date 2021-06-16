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
  datospedidos: any

  constructor(
    private firestoreService: FirestoreService,
    private accountService: AccountService,
    private codigoqr: CodigoqrService
    ) { }

  ngOnInit(): void {
    this.pedidos = [];
    this.datospedidos = [];

    this.firestoreService.getPedidos(this.accountService.uid).subscribe((pedidoSnapshot) => {
        pedidoSnapshot.forEach((pedido) => {
          let apartado = pedido.payload.doc.data();

          let data = { fecha: apartado['fecha'], data: apartado['data'] };

          this.pedidos.push(data);
          console.log(data);
        });
      });

    this.codigoqr.getDatosPedidos().subscribe(
      (res) => {
        this.datospedidos = res;
        console.log(res);
      },
      (err) => console.log(err)
    );
  }

}
