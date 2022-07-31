import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Proyectos } from '../model/proyectos';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  URL = 'https://portfolioagustincastilla.herokuapp.com';


  constructor(private http:HttpClient) { }
    
  public getProyectos(): Observable<Proyectos[]>{
    return this.http.get<Proyectos[]>(`${this.URL}/proyectos/lista`);
      }
  public addProyectos(proyectos:Proyectos):Observable<Proyectos>{
    return this.http.post<Proyectos>(`${this.URL}/proyectos/agregar`,proyectos);
  }
  public updateProyectos(proyectos:Proyectos): Observable<Proyectos>{
    return this.http.put<Proyectos>(`${this.URL}/proyectos/editar`,proyectos);
  }
  public deleteProyectos(proyectosId:number):Observable<void>{
    return this.http.delete<void>(`${this.URL}/proyectos/borrar/${proyectosId}`);
  }
}
