import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Persona } from '../model/persona.model';

@Injectable({
  providedIn: 'root'
})
 

export class PersonaService {
  URL = 'https://portfolioagustincastilla.herokuapp.com'

  constructor (private http: HttpClient) { }
  
 public getPersona():Observable<Persona> {
   return this.http.get<Persona>(`${this.URL}/persona/id/1`);
 }
   
 public updatePersona( persona: Persona):Observable<Persona>{
   return this.http.put<Persona>(`${this.URL}/persona/editar`, persona);
 }
 public addPersona(persona:Persona):Observable<Persona>{
  return this.http.post<Persona>(`${this.URL}/persona/agregar`,persona);
}
public deletePersona(personaId:number):Observable<void>{
  return this.http.delete<void>(`${this.URL}/persona/borrar/${personaId}`);
}
}
