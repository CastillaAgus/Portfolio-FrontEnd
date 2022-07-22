import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Proyectos } from 'src/app/model/proyectos';
import { ProyectosService } from 'src/app/service/proyectos.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  public proyectos:Proyectos []=[];

  constructor(private proyectosService:ProyectosService) { }

  ngOnInit(): void {
    this.getProyectos();
  }
 
public getProyectos():void {
  this.proyectosService.getProyectos().subscribe({
    next:(Response:Proyectos[]) =>{
       this.proyectos=Response;   
    },
    error:(error:HttpErrorResponse)=>{
      alert(error.message);
    }
  })
}
  
}
