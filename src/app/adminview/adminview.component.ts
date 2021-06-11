import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminview',
  templateUrl: './adminview.component.html',
  styleUrls: ['./adminview.component.css']
})
export class AdminviewComponent implements OnInit {

  nombre: string
  descripcion: string
  precio: number
  categoria: number
  existencia: number
  id: string


  constructor() { }

  ngOnInit(): void {
  }

  addProducto() {
    alert("xD")
  }

}
