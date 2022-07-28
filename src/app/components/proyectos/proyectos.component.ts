import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Proyectos } from 'src/app/model/proyectos';
import { ProyectosService } from 'src/app/service/proyectos.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  
  public proyectoss:Proyectos []=[];
  public editProyectos:Proyectos | undefined;
  public deleteProyectos:Proyectos | undefined;
 public addProyectos:Proyectos | undefined;
 
  constructor(private proyectosService:ProyectosService, private tokenService: TokenService) { }
 isLogged = false;
  ngOnInit(): void {
    this.getProyectos();
    if( this.tokenService.getToken()){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }
 
public getProyectos():void {
  this.proyectosService.getProyectos().subscribe({
    next:(Response:Proyectos[]) =>{
       this.proyectoss=Response;   
    },
    error:(error:HttpErrorResponse)=>{
      alert(error.message);
    }
  })
}
public onOpenModal(mode:String,proyectos?:Proyectos):void {
  const container=document.getElementById('main-container');
  const button=document.createElement('button');
  button.style.display='none';
  button.setAttribute('data-toggle','modal');
  if(mode==='add') {
    button.setAttribute('data-target','#addProyectosModal');
  } else if (mode==='delete'){
    this.deleteProyectos=proyectos;
    button.setAttribute('data-target','#deleteProyectosModal');
  } else if (mode==='edit'){
   this.editProyectos=proyectos;
   button.setAttribute('data-target','#editProyectosModal');
 }
container?.appendChild(button);
button.click(); 
}  
public onAddProyectos(addForm: NgForm){
  document.getElementById('add-proyectos-form')?.click();
  this.proyectosService.addProyectos(addForm.value).subscribe({
    next: (response:Proyectos)=>{
      console.log(response);
      this.getProyectos();
      addForm.reset();
    },
    error:(error:HttpErrorResponse)=>{
      alert(error.message);
      addForm.reset(); 
    }
  })
} 
public onUpdateProyectos(proyectos: Proyectos){
  this.editProyectos=proyectos;
  document.getElementById('add-proyectos-form')?.click();
  this.proyectosService.updateProyectos(proyectos).subscribe({
    next: (response:Proyectos)=>{
      console.log(response);
      this.getProyectos();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
  })
} 
public onDeleteProyectos(idPro:number):void{

   this.proyectosService.deleteProyectos(idPro).subscribe({
   next: (response:void)=>{
     console.log(response);
     this.getProyectos();
     },
     error:(error:HttpErrorResponse)=>{
       alert(error.message);
     }
 })
} 


}
