import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { HttpClient, HttpParams } from '@angular/common/http';
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
    this.datosPortfolio.obtenerExperiencia().subscribe(data =>{
      // console.log(data)
      this.experienciaList = data;
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
   
   this.sendPostRequest(obj).subscribe((res: any) => {this.ngOnInit()})
  }

  cambiar_parrafo(i : number){
    document.getElementById("editableEx" + i)!.style.display = "block";
    console.log("llamada funcion cambiar_parrafo")
  };
  sendPutRequest(img:any, url:any, inst:any, car:any, year:any, id: number): Observable<any> {
    const requestOptions: Object = {
      /* other options here */
      responseType: 'text'
    }
    const params = new HttpParams()
      .set('company', inst)
      .set("position", car)
      .set("img", img)
      .set("url",url)
      .set("years",year);
      const httpParams =params.toString()
    //  const directParams = ""+inst+"&"+car+"&"+img+"&"+url+"&"+year 
    console.log(httpParams)
    // console.log(directParams)

    return this.http.put<any>(`https://arg-prog-backend.herokuapp.com/experiencia/editar/${id}?`+ httpParams, requestOptions);
  }
  actualizar_datos(i:number){
    const img = (<HTMLInputElement>document.getElementById("logoEx"+i))?.value;
    const url = (<HTMLInputElement>document.getElementById("urlEx"+i))?.value;
    const inst = (<HTMLInputElement>document.getElementById("institucionEx"+i))?.value;
    const car = (<HTMLInputElement>document.getElementById("posicionEx"+i))?.value;
    const year = (<HTMLInputElement>document.getElementById("yearsEx"+i))?.value;
    const id =i
    // const f = JSON.stringify({"id":id,"company": inst, "position": car, "img" : img, "url":url,"years" : year})
    // const obj = JSON.parse(f)
   document.getElementById("editableEx" + i)!.style.display = "none";
    // console.log(obj);
   this.sendPutRequest(img, url, inst, car, year, i).subscribe((res: any) => {this.ngOnInit()})
   
  }
  sendDeleteRequest( id: number): Observable<any> {
    const requestOptions: Object = {
      /* other options here */
      responseType: 'text'
    }
    return this.http.delete<any>(`https://arg-prog-backend.herokuapp.com/experiencia/borrar/${id}`, requestOptions);
  }
  borrar_parrafo(i : number){
    
    this.sendDeleteRequest(i).subscribe((res:any)=>{this.ngOnInit()});
  }

 
  
}

