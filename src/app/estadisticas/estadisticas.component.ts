import { Component} from '@angular/core';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent{

  //datos de las lineas
  public lineChartData:Array<any>=[
    {data: [65, 59, 80, 81, 56, 55, 40],label: 'Domicilio' },
    {data: [28,48, 40, 19, 86, 27, 90],label: 'Local' },
    {data: [18, 48, 77, 9, 100, 27, 40],label: 'Recoger' }
  ];
//nombres del eje x
  public lineChartLabels:Array<any> = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio'];


//opciones de como quiero la grafica
  public lineChartOption:any={
    responsive:true
  };


  //propiedades de los colores que aparecen en las graficas.
  //si los quito me pone colores por defecto
  public lineChartColors:Array<any>=[
    {
      //gris
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { //dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    {
      //grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  //linea para poner leyendas
  public lineChartLegend:boolean=true;
  public lineChartType:string='line';

  public bandera:boolean=true;

  //para generar un random
  //creando en el arreglo objetos aleatorios

  public randomize():void{
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for(let i=0; i<this.lineChartData.length;i++){
      _lineChartData[i]={data:new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for(let j=0;j<this.lineChartData[i].data.length;j++){
        _lineChartData[i].data[j] = Math.floor((Math.random()*100)+1);
      }
    }
    this.lineChartData = _lineChartData;
    this.bandera=false;
  }
//events
public chartClicked(e:any):void{
  console.log(e);
}

public chartHovered(e:any):void{
  console.log(e);
}


}
