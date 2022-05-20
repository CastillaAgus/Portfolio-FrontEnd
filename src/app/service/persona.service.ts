import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { persona } from '../model/persona.model';

@Injectable({
  providedIn: 'root'
})
 
// deespues tengo que poner la url del servidor // 
export class PersonaService {
  URL = 'hhtp://localhost:8080/personas/'

  constructor (private http: HttpClient) { }
  

   public getPersona(): Observable<persona> {
     return this.http.get<persona>(this.URL + 'traer/perfil');
     
   }


}
