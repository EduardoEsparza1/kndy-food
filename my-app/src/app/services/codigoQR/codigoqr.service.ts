import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CodigoqrService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  /*Me devuelve todos los pedidos*/
  getDatosPedidos(){
    return this.http.get(`${this.API_URI}/codigoqr`)
  }

  /*me devuelve un pedido en especifico*/
  getDatosPedido(id: string){
    return this.http.get(`${this.API_URI}/codigoqr/${id}`)
  }

  /*saveDatoPedido(){
    
  }*/

}
