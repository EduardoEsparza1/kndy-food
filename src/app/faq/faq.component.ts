import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/screenReader/global.service';


@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})

export class FaqComponent implements OnInit {

  validarSpeak: GlobalService; 
  mensaje: any;
  oracion: any;

  constructor(global: GlobalService) { 
    if ('speechSynthesis' in window) {
      this.mensaje = new SpeechSynthesisUtterance();
    } else {
      alert("Lo siento, tu navegador no soporta esta tecnología");
    }
    this.validarSpeak = global;
    console.log(this.validarSpeak);
  }

  ngOnInit(): void {
  }

  playSpeak(f1:string) {
  
    //this.oracion = document.getElementById(t1).innerHTML +". " + document.getElementById(t2).innerHTML +". " + document.getElementById(t3).innerHTML;
    this.oracion = document.getElementById(f1).innerHTML;
    this.mensaje.text= this.oracion; 
    if(speechSynthesis.paused){
      speechSynthesis.resume();
    }else{
      speechSynthesis.cancel();
      speechSynthesis.speak(this.mensaje);
    }
    
  }

  stopSpeak(){
    speechSynthesis.pause();
  }

  playSpeak2(f2:string,f3:string) {
  
    this.oracion = document.getElementById(f2).innerHTML +". " + document.getElementById(f3).innerHTML;
    this.mensaje.text= this.oracion; 
    if(speechSynthesis.paused){
      speechSynthesis.resume();
    }else{
      speechSynthesis.cancel();
      speechSynthesis.speak(this.mensaje);
    }
  }


}
