import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  educacionList:any;
  postId:any
  
  constructor(private datosPortfolio : PortfolioService, private authservice : AuthService, private http:HttpClient) { 
  
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
   
  sendPostRequest(data: any): Observable<any> {
    const requestOptions: Object = {
      /* other options here */
      responseType: 'text'
    }
    return this.http.post<any>('https://arg-prog-backend.herokuapp.com/educacion/crear', data, requestOptions);
  }
  crear_educacion(){
    const img = (<HTMLInputElement>document.getElementById("logo"))?.value;
    const url = (<HTMLInputElement>document.getElementById("url"))?.value;
    const inst = (<HTMLInputElement>document.getElementById("institucion"))?.value;
    const car = (<HTMLInputElement>document.getElementById("carrera"))?.value;
    const year = (<HTMLInputElement>document.getElementById("years"))?.value;
    (<HTMLInputElement>document.getElementById("agregarEducacion"))!.style.display = "none";
    const f = JSON.stringify({"school": inst, "career": car, "img" : img, "url":url,"years" : year})
    const obj = JSON.parse(f)
    
    //console.log("llamada funcion crear educacion")
   
   this.sendPostRequest(obj).subscribe((res: any) => {})
  }

  cambiar_parrafo(i : number){
    document.getElementById("editable" + i)!.style.display = "block";
    console.log("llamada funcion cambiar_parrafo")
  };
  sendPutRequest(data: any, id: string | number): Observable<any> {
    const requestOptions: Object = {
      /* other options here */
      responseType: 'text'
    }
    return this.http.post<any>('https://arg-prog-backend.herokuapp.com/educacion/editar/'+id, data, requestOptions);
  }
  actualizar_datos(i:number){
    const img = (<HTMLInputElement>document.getElementById("logo"+i))?.value;
    const url = (<HTMLInputElement>document.getElementById("url"+i))?.value;
    const inst = (<HTMLInputElement>document.getElementById("institucion"+i))?.value;
    const car = (<HTMLInputElement>document.getElementById("carrera"+i))?.value;
    const year = (<HTMLInputElement>document.getElementById("años"+i))?.value;
    const id =(<HTMLInputElement>document.getElementById("id"+i))?.value;
    const f = JSON.stringify({"id":id,"school": inst, "career": car, "img" : img, "url":url,"years" : year})
    const obj = JSON.parse(f)
   document.getElementById("editable" + i)!.style.display = "none";
   this.sendPutRequest(obj, id).subscribe((res: any) => {})
    console.log(obj);
  }
  sendDeleteRequest( id: string | number): Observable<any> {
    const requestOptions: Object = {
      /* other options here */
      responseType: 'text'
    }
    return this.http.delete<any>('https://arg-prog-backend.herokuapp.com/educacion/borrar/'+id, requestOptions);
  }
  borrar_parrafo(i : number){
    const id =(<HTMLInputElement>document.getElementById("id"+i))?.value;
    this.sendDeleteRequest(id).subscribe((res:any)=>{});
  }

 
  
}
