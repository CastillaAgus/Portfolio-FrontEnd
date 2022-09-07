import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Educacion } from '../model/educacion';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  URL = 'https://portfolioagustincastilla.herokuapp.com';


  constructor(private http:HttpClient) { }
    
  public getEducacion(): Observable<Educacion[]>{
    return this.http.get<Educacion[]>(`${this.URL}/educacion/lista`);
      }
  public addEducacion(educacion:Educacion):Observable<Educacion>{
    return this.http.post<Educacion>(`${this.URL}/educacion/agregar`,educacion);
  }
  public updateEducacion(educacion:Educacion): Observable<Educacion>{
    return this.http.put<Educacion>(`${this.URL}/educacion/editar`,educacion);
  }
  public deleteEducacion(educacionId:number):Observable<void>{
    return this.http.delete<void>(`${this.URL}/educacion/borrar/${educacionId}`);
  }
}
