import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Persona} from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  public  deletePersona: Persona | undefined;
  public persona: Persona | undefined;
  public editPersona: Persona | undefined;
  constructor(public personaService: PersonaService, private tokenService: TokenService) { }
 
  isLogged = false;
  ngOnInit(): void {
    this.getPersona();
    if( this.tokenService.getToken()){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  public getPersona():void {
      this.personaService.getPersona().subscribe({
        next: (response: Persona)=>{
          this.persona=response;
        },
        error:(error:HttpErrorResponse)=>{
          alert(error.message)
        }
     })
  }
  public onOpenModal(mode:String,persona?:Persona):void {
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
     if (mode==='delete'){
      this.deletePersona=persona;
      button.setAttribute('data-target','#deletePersonaModal');
    } else if (mode==='edit'){
     this.editPersona=persona;
     button.setAttribute('data-target','#editPersonaModal');
   }
  container?.appendChild(button);
  button.click(); 
  }  
  
  public onUpdatePersona(persona: Persona){
    this.editPersona=persona
    document.getElementById('add-persona-form')?.click();
    this.personaService.updatePersona(persona).subscribe({
      next: (response:Persona)=>{
        console.log(response);
        this.getPersona();
        },
        error:(error:HttpErrorResponse)=>{
          alert(error.message);
        }
    })
  } 
  public onDeletePersona(id:number):void{
  
     this.personaService.deletePersona(id).subscribe({
     next: (response:void)=>{
       console.log(response);
       this.getPersona();
       },
       error:(error:HttpErrorResponse)=>{
         alert(error.message);
       }
   })
  } 

}
