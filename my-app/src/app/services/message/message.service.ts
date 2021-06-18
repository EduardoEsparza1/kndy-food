import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  sendMessage(body) {
    return this.http.post('https://kndy-food-8c7ba.web.app/api/formulario', body);
  }
}
