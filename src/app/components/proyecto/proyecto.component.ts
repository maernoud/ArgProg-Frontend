import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {

  constructor(private datosPortfolio : PortfolioService, private authservice : AuthService,private http:HttpClient) { }
  proyectoList:any;
    userLogged = this.authservice.getUserLogged();

  ngOnInit(): void {
    this.datosPortfolio.obtenerProyectos().subscribe(data =>{
      this.proyectoList = data;})
  }

  formularioAgregar(){
    
    console.log("funcion formularioAgregar llamada")
    document.getElementById("agregarPr")!.style.display = "block";
  }
   
  sendPostRequest(data: any): Observable<any> {
    const requestOptions: Object = {
      /* other options here */
      responseType: 'text'
    }
    return this.http.post<any>('https://arg-prog-backend.herokuapp.com/proyectos/crear', data, requestOptions);
  }
  crear_proyecto(){
    const img = (<HTMLInputElement>document.getElementById("logoPr"))?.value;
    const url = (<HTMLInputElement>document.getElementById("urlPr"))?.value;
    const title = (<HTMLInputElement>document.getElementById("nombrePr"))?.value;
    const des = (<HTMLInputElement>document.getElementById("descripcionPr"))?.value;
    const f = JSON.stringify({"title": title , "description": des, "img" : img, "url":url})
    const obj = JSON.parse(f)
   //console.log("llamada funcion crear educacion")
   (<HTMLInputElement>document.getElementById("agregarPr"))!.style.display = "none";
   console.log(obj)
   this.sendPostRequest(obj).subscribe((res: any) => {this.ngOnInit()})
  }

  cambiar_parrafo(i : number){
    document.getElementById("editablePr" + i)!.style.display = "block";
    // console.log("llamada funcion cambiar_parrafo")
  };
  sendPutRequest(title : any, des:any, img:any,url:any, id:number): Observable<any> {
    const requestOptions: Object = {
      /* other options here */
      responseType: 'text'
    }
    const params = new HttpParams()
      .set('title', title)
      .set("description", des)
      .set("img", img)
      .set("url",url);
      const httpParams =params.toString()
    //  const directParams = ""+inst+"&"+car+"&"+img+"&"+url+"&"+year 
    console.log(httpParams)
    return this.http.put<any>(`https://arg-prog-backend.herokuapp.com/proyectos/editar/${id}?`+ httpParams,  requestOptions);
  }
  actualizar_datos(i:number){
    const img = (<HTMLInputElement>document.getElementById("logoPr"+i))?.value;
    const url = (<HTMLInputElement>document.getElementById("urlPr"+i))?.value;
    const title = (<HTMLInputElement>document.getElementById("nombrePr"+i))?.value;
    const des = (<HTMLInputElement>document.getElementById("descripcionPr"+i))?.value;
    const id =i
    // const f = JSON.stringify({"id":id,"title": title , "description": des, "img" : img, "url":url})
    // const obj = JSON.parse(f)
   document.getElementById("editablePr" + i)!.style.display = "none";
   this.sendPutRequest(title, des, img, url, id).subscribe((res: any) => {this.ngOnInit()})
    // console.log(obj);
  }
  sendDeleteRequest( id: string | number): Observable<any> {
    const requestOptions: Object = {
      /* other options here */
      responseType: 'text'
    }
    return this.http.delete<any>(`https://arg-prog-backend.herokuapp.com/proyectos/borrar/${id}`, requestOptions);
  }
  borrar_parrafo(i : number){
    
    this.sendDeleteRequest(i).subscribe((res:any)=>{this.ngOnInit()});
  }


}
