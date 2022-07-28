import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { main } from '@popperjs/core';
import { Educacion } from 'src/app/model/educacion';
import { EducacionService } from 'src/app/service/educacion.service';
import { TokenService } from 'src/app/service/token.service';


@Component({
  selector: 'app-formacion',
  templateUrl: './formacion.component.html',
  styleUrls: ['./formacion.component.css']
})
export class FormacionComponent implements OnInit {

  public educaciones:Educacion []=[];
  public editEducacion:Educacion | undefined;
  public deleteEducacion:Educacion | undefined;
 public addEducacion:Educacion | undefined;
 
 constructor(private educacionService:EducacionService, private tokenService: TokenService) { }
 isLogged = false;

  ngOnInit(): void {
    this.getEducacion();
    if( this.tokenService.getToken()){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }
 
public getEducacion():void {
  this.educacionService.getEducacion().subscribe({
    next:(response:Educacion[]) =>{
       this.educaciones=response;   
    },
    error:(error:HttpErrorResponse)=>{
      alert(error.message);
    }
  })
}
 public onOpenModal(mode:String,educacion?:Educacion):void {
   const container=document.getElementById('main-container');
   const button=document.createElement('button');
   button.style.display='none';
   button.setAttribute('data-toggle','modal');
   if(mode==='add') {
     button.setAttribute('data-target','#addEducacionModal');
   } else if (mode==='delete'){
     this.deleteEducacion=educacion;
     button.setAttribute('data-target','#deleteEducacionModal');
   } else if (mode==='edit'){
    this.editEducacion=educacion;
    button.setAttribute('data-target','#editEducacionModal');
  }
 container?.appendChild(button);
 button.click(); 
}
 public onAddEducacion(addForm: NgForm){
   document.getElementById('add-education-form')?.click();
   this.educacionService.addEducacion(addForm.value).subscribe({
     next: (response:Educacion)=>{
       console.log(response);
       this.getEducacion();
       addForm.reset();
     },
     error:(error:HttpErrorResponse)=>{
       alert(error.message);
       addForm.reset(); 
     }
   })
 } 
 public onUpdateEducacion(educacion: Educacion){
   this.editEducacion=educacion;
   document.getElementById('add-education-form')?.click();
   this.educacionService.updateEducacion(educacion).subscribe({
     next: (response:Educacion)=>{
       console.log(response);
       this.getEducacion();
       },
       error:(error:HttpErrorResponse)=>{
         alert(error.message);
       }
   })
 } 
 public onDeleteEducacion(idEdu:number):void{
 
    this.educacionService.deleteEducacion(idEdu).subscribe({
    next: (response:void)=>{
      console.log(response);
      this.getEducacion();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
  })
} 
}
