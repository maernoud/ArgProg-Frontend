import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  educacionList:any;
  constructor(private datosPortfolio : PortfolioService, private authservice : AuthService) { 
  
  }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      this.educacionList = data.education;
    })
  }
  userLogged = this.authservice.getUserLogged();

  formularioAgregar(){
    
    console.log("funcion formularioAgregar llamada")
    document.getElementById("agregarEducacion")!.style.display = "block";
  }

  crear_educacion(){
    const img = (<HTMLInputElement>document.getElementById("logo"))?.value;
    const url = (<HTMLInputElement>document.getElementById("url"))?.value;
    const inst = (<HTMLInputElement>document.getElementById("institucion"))?.value;
    const car = (<HTMLInputElement>document.getElementById("carrera"))?.value;
    const year = (<HTMLInputElement>document.getElementById("years"))?.value;
    (<HTMLInputElement>document.getElementById("agregarEducacion"))!.style.display = "none";
    const f = JSON.stringify({"school": inst, "carreer": car, "img" : img, "url":url,"years" : year})
    // data: {data : f}
    
    console.log("llamada funcion crear educacion")
    console.log(f);
  }

  cambiar_parrafo(i : number){
    document.getElementById("editable" + i)!.style.display = "block";
    console.log("llamada funcion cambiar_parrafo")
  };
  actualizar_datos(i:number){
    const img = (<HTMLInputElement>document.getElementById("logo"+i))?.value;
    const url = (<HTMLInputElement>document.getElementById("url"+i))?.value;
    const inst = (<HTMLInputElement>document.getElementById("institucion"+i))?.value;
    const car = (<HTMLInputElement>document.getElementById("carrera"+i))?.value;
    const year = (<HTMLInputElement>document.getElementById("años"+i))?.value;
    const f = JSON.stringify({"school": inst, "carreer": car, "img" : img, "url":url,"years" : year})
    // data: {data : f}
    document.getElementById("editable" + i)!.style.display = "none";
    console.log(f);
  }
  borrar_parrafo(i : number){
    
  }

  // text_change(value : string){
  //   document.getElementById("texto")!.innerText=value;
  // }

  
}
