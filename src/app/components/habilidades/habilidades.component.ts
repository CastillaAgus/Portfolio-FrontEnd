import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Skills } from 'src/app/model/habilidades';
import { HabilidadesService } from 'src/app/service/habilidades.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {

  public skills:Skills []=[];

  constructor(private habilidadesService:HabilidadesService) { }

  ngOnInit(): void {
    this.getSkills();
  }
 
public getSkills():void {
  this.habilidadesService.getSkills().subscribe({
    next:(Response:Skills[]) =>{
       this.skills=Response;   
    },
    error:(error:HttpErrorResponse)=>{
      alert(error.message);
    }
  })
}


}
