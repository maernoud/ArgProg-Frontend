import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  constructor(private datosPortfolio: PortfolioService, private authservice : AuthService,private http:HttpClient) { }
  experienciaList:any;
  userLogged = this.authservice.getUserLogged();
  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      // console.log(data)
      this.experienciaList = data.experiencia;
    });
  }
  formularioAgregar(){
    
    // console.log("funcion formulario Agregar llamada")
    (<HTMLInputElement>document.getElementById("agregarExperiencia"))!.style.display = "block";
  }
   
  sendPostRequest(data: any): Observable<any> {
    const requestOptions: Object = {
      /* other options here */
      responseType: 'text'
    }
    return this.http.post<any>('https://arg-prog-backend.herokuapp.com/experiencia/crear', data, requestOptions);
  }
  crear_experiencia(){
    const img = (<HTMLInputElement>document.getElementById("logoEx"))?.value;
    const url = (<HTMLInputElement>document.getElementById("urlEx"))?.value;
    const inst = (<HTMLInputElement>document.getElementById("empresaEx"))?.value;
    const car = (<HTMLInputElement>document.getElementById("posicionEx"))?.value;
    const year = (<HTMLInputElement>document.getElementById("yearsEx"))?.value;
    (<HTMLInputElement>document.getElementById("agregarExperiencia"))!.style.display = "none";
    const f = JSON.stringify({"company": inst, "position": car, "img" : img, "url":url,"years" : year})
    const obj = JSON.parse(f)
    
    console.log("llamada funcion crear experiencia")
   
   this.sendPostRequest(obj).subscribe((res: any) => {})
  }

  cambiar_parrafo(i : number){
    document.getElementById("editableEx" + i)!.style.display = "block";
    console.log("llamada funcion cambiar_parrafo")
  };
  sendPutRequest(data: any, id: string | number): Observable<any> {
    const requestOptions: Object = {
      /* other options here */
      responseType: 'text'
    }
    return this.http.post<any>('https://arg-prog-backend.herokuapp.com/experiencia/editar/'+id, data, requestOptions);
  }
  actualizar_datos(i:number){
    const img = (<HTMLInputElement>document.getElementById("logoEx"+i))?.value;
    const url = (<HTMLInputElement>document.getElementById("urlEx"+i))?.value;
    const inst = (<HTMLInputElement>document.getElementById("institucionEx"+i))?.value;
    const car = (<HTMLInputElement>document.getElementById("carreraEx"+i))?.value;
    const year = (<HTMLInputElement>document.getElementById("añosEx"+i))?.value;
    const id =(<HTMLInputElement>document.getElementById("idEx"+i))?.value;
    const f = JSON.stringify({"id":id,"company": inst, "position": car, "img" : img, "url":url,"years" : year})
    const obj = JSON.parse(f)
   document.getElementById("editableEx" + i)!.style.display = "none";
   this.sendPutRequest(obj, id).subscribe((res: any) => {})
    //console.log(obj);
  }
  sendDeleteRequest( id: string | number): Observable<any> {
    const requestOptions: Object = {
      /* other options here */
      responseType: 'text'
    }
    return this.http.delete<any>('https://arg-prog-backend.herokuapp.com/experiencia/borrar/'+id, requestOptions);
  }
  borrar_parrafo(i : number){
    const id =(<HTMLInputElement>document.getElementById("idEx"+i))?.value;
    this.sendDeleteRequest(id).subscribe((res:any)=>{});
  }

 
  
}

