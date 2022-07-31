import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Experiencia } from '../model/experiencia';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {
  
  URL = 'https://portfolioagustincastilla.herokuapp.com'

  constructor(private http:HttpClient) {}
    public getExperiencia(): Observable<Experiencia[]>{
      return this.http.get<Experiencia[]>(`${this.URL}/experiencia/lista`);
        }
    public addExperiencia(experiencia:Experiencia):Observable<Experiencia>{
      return this.http.post<Experiencia>(`${this.URL}/experiencia/agregar`,experiencia);
    }
    public updateExperiencia(experiencia:Experiencia): Observable<Experiencia>{
      return this.http.put<Experiencia>(`${this.URL}/experiencia/editar`,experiencia);
    }
    public deleteExperiencia(experienciaId:number):Observable<void>{
      return this.http.delete<void>(`${this.URL}/experiencia/borrar/${experienciaId}`);
    }
   }

