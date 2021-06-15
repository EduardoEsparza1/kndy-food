import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  //PRODUCTOS

  //Nuevo Producto
  public newProducto(
    data: {
      nombre: string,
      precio: number,
      categoria: number,
      descripcion: string,
      existencia: number
    }
  ) {
    return this.firestore.collection('productos').add(data)
  }
  
  //Obtener todos los productos
  public getProductos() {
    return this.firestore.collection('productos').snapshotChanges()
  }

  
  //Obtiene un producto
  public getProducto(documentId: string) {
    return this.firestore.collection('productos').doc(documentId).snapshotChanges();
  }

  //Actualiza un producto
  public updateProducto(documentId: string, data: any) {
    return this.firestore.collection('productos').doc(documentId).set(data);
  }
  
  //Elimina un producto
  public deleteProducto(documentId: string) {
    return this.firestore.collection('productos').doc(documentId).delete()
  }

  //CARRITO

  //Obtener carrito
  public getCart(uid: any) {
    return this.firestore.collection('carrito', data => {
      return data.where('uid', '==', uid)
    }).snapshotChanges()
  }

  //Añadir elemento
  public addToCart(data: {
    uid: string,
    producto: object,
    cantidad: number
  }) {
    return this.firestore.collection('carrito').add(data)
  }

  //Eliminar del carrito
  public dropCart(documentId: string) {
    return this.firestore.collection('carrito').doc(documentId).delete()
  }

  //Actualizar producto del carrito
  public updateCartProduct(documentId: string, data: any) {
    return this.firestore.collection('carrito').doc(documentId).set(data);
  }

  //Eliminar carrito
  public deleteCart(documentId) {
    return this.firestore.collection('carrito').doc(documentId).delete()
  }

  //PEDIDOS

  //Nuevo pedido
  public addPedido(data: {
    data: object,
    uid: string,
    fecha: string
  }) {
    return this.firestore.collection('pedidos').add(data)
  }

  //Obtener pedidos de usuario
  public getPedidos(uid: string) {
    return this.firestore.collection('pedidos', data => {
      return data.where('uid', '==', uid)
    }).snapshotChanges()
  }

}
