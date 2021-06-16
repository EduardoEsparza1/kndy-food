import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountService } from '../login/account.service';

@Injectable({
  providedIn: 'root',
})
export class CodigoqrService {
  API_URI = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {}

  /*Me devuelve todos los pedidos*/
  /*getDatosPedidos() {
    return this.http.get(`${this.API_URI}/codigoqr`);
  }*/

  /*Me devuelve los pedidos de un usuario*/
  getDatosPedidos() {
    return this.http.get(`${this.API_URI}/codigoqr/${this.accountService.uid}`);
  }

}
