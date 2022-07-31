import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Skills } from '../model/habilidades';

@Injectable({
  providedIn: 'root'
})
export class HabilidadesService {

  URL = 'https://portfolioagustincastilla.herokuapp.com';


  constructor(private http:HttpClient) { }
    
  public getSkills(): Observable<Skills[]>{
    return this.http.get<Skills[]>(`${this.URL}/skills/lista`);
      }
  public addSkills(skills:Skills):Observable<Skills>{
    return this.http.post<Skills>(`${this.URL}/skills/agregar`,skills);
  }
  public updateSkills(skills:Skills): Observable<Skills>{
    return this.http.put<Skills>(`${this.URL}/skills/editar`,skills);
  }
  public deleteSkills(skillsId:number):Observable<void>{
    return this.http.delete<void>(`${this.URL}/skills/borrar/${skillsId}`);
  }
}
