import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  educacionList:any;
  postId:any
  
  constructor(private datosPortfolio : PortfolioService, private authservice : AuthService, private http:HttpClient, private cRef: ChangeDetectorRef) { 
  
  }

  ngOnInit(): void {
    this.datosPortfolio.obtenerEducacion().subscribe(data =>{
      this.educacionList = data;
     console.log(data)
      
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
   
   this.sendPostRequest(obj).subscribe((res: any) => {this.ngOnInit()})
  }

  cambiar_parrafo(i : number){
    document.getElementById("editable" + i)!.style.display = "block";
    console.log("llamada funcion cambiar_parrafo")
  };
  sendPutRequest(inst:any,car:any,img:any,url:any,year:any, id: number): Observable<any> {
  //sendPutRequest(obj:any, id: number): Observable<any> {
    const requestOptions: Object = {
      /* other options here */
      responseType: 'text'
    }
    const params = new HttpParams()
      .set('school', inst)
      .set("career", car)
      .set("img", img)
      .set("url",url)
      .set("years",year);
      const httpParams =params.toString()
    //  const directParams = ""+inst+"&"+car+"&"+img+"&"+url+"&"+year 
    console.log(httpParams)
    // console.log(directParams)

    //return this.http.put<any>(`https://arg-prog-backend.herokuapp.com/educacion/editar/${id}`, obj, requestOptions);
    return this.http.put<any>(`https://arg-prog-backend.herokuapp.com/educacion/editar/${id}?`+httpParams, requestOptions);
  }
  actualizar_datos(i:number){
    const img = (<HTMLInputElement>document.getElementById("logo"+i))?.value;
    const url = (<HTMLInputElement>document.getElementById("url"+i))?.value;
    const inst = (<HTMLInputElement>document.getElementById("institucion"+i))?.value;
    const car = (<HTMLInputElement>document.getElementById("carrera"+i))?.value;
    const year = (<HTMLInputElement>document.getElementById("years"+i))?.value;
    const id =i
    //  const f = JSON.stringify({"id":id,"school": inst, "career": car, "img" : img, "url":url,"years" : year})
    //  const obj = JSON.parse(f)
   document.getElementById("editable" + i)!.style.display = "none";
  //  console.log(obj);
   this.sendPutRequest(inst, car, img, url,year, i).subscribe((res: any) => {this.ngOnInit()})
  //  this.sendPutRequest(obj, i).subscribe((res: any) => {this.ngOnInit()})
    
  }
  sendDeleteRequest( id: number): Observable<any> {
    const requestOptions: Object = {
      
      responseType: 'text'
    }
    
    return this.http.delete<any>(`https://arg-prog-backend.herokuapp.com/educacion/borrar/${id}`, requestOptions)
    
    
  }
  borrar_parrafo(i : number){
      
    
       this.sendDeleteRequest(i).subscribe((res:any)=>{this.ngOnInit()});
    
  }

 
  
}
