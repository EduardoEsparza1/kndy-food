import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from '../services/firestore/firestore.service'

import Swal from 'sweetalert2';

@Component({
  selector: 'app-adminview',
  templateUrl: './adminview.component.html',
  styleUrls: ['./adminview.component.css']
})
export class AdminviewComponent implements OnInit {

  accion = 0 //0=crear, 1=editar

  public pasteles = []
  public gelatinas = []
  public galletas = []

  public documentId = null

  triedAdd: boolean

  public newProductForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.compose([Validators.required, Validators.min(1)])),
    categoria: new FormControl(0, Validators.compose([Validators.required, Validators.min(1)])),
    existencia: new FormControl('', Validators.compose([Validators.required, Validators.min(0)])),
    id: new FormControl('')
  });


  constructor(private firestoreService: FirestoreService) { }

  ngOnInit(): void {

    this.accion = 0
    this.triedAdd = false

    this.firestoreService.getProductos().subscribe(productsSnapshot => {
      this.pasteles = []
      this.gelatinas = []
      this.galletas = []

      productsSnapshot.forEach((productData: any) => {
        let product = productData.payload.doc
        if(product.data().categoria == 1) //Pastel
          this.pasteles.push({
            id: product.id,
            data: product.data()
          })
        else if(product.data().categoria == 2) //Gelatina
          this.gelatinas.push({
            id: product.id,
            data: product.data()
          })
        else if(product.data().categoria == 3) //Galleta
          this.galletas.push({
            id: product.id,
            data: product.data()
          })

      })
    })

  }

  addProducto(form, documentId = this.documentId) {
    this.triedAdd = true
    if(this.newProductForm.valid) {

      let data = {
        nombre: form.nombre,
        descripcion: form.descripcion,
        precio: form.precio,
        categoria: form.categoria,
        existencia: form.existencia
      }

      if(this.accion == 0) {//Crear

        this.firestoreService.newProducto(data).then(() => {
          Swal.fire('Editado exitosamente')
          this.cancel()
        }, error => alert("error en la matrix (edicion)"))

      } else {//Editar

        this.firestoreService.updateProducto(documentId, data).then(() => {
          Swal.fire('Editado exitosamente')
        }, error => alert("error en la matrix (edicion)"))

      }
      this.cancel()
    }
  }

  editarProducto(documentId) {

    let editSubscribe = this.firestoreService.getProducto(documentId).subscribe(producto => {
      this.documentId = documentId
      this.accion = 1
      let datos = producto.payload.data()
      this.newProductForm.setValue({
        id: documentId,
        nombre: datos['nombre'],
        descripcion: datos['descripcion'],
        precio: datos['precio'],
        categoria: datos['categoria'],
        existencia: datos['existencia']
      })
      editSubscribe.unsubscribe()
    })
  }

  eliminarProducto() {
    let wantToDelete = confirm("Eliminar?")
    if(wantToDelete) {
      this.firestoreService.deleteProducto(this.documentId).then(() => {
        Swal.fire('Producto eliminado')
        this.cancel()
      })
    }
  }

  cancel() {
    this.documentId = null
    this.triedAdd = false
    this.accion = 0
    this.newProductForm.setValue({
      nombre: '',
      descripcion: '',
      precio: '',
      categoria: 0,
      existencia: '',
      id: ''
    })
  }

}
