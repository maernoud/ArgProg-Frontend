import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  about :any
  position: any
  aboutList:any;
  

  constructor(private datosPortfolio: PortfolioService,private authservice : AuthService,private http:HttpClient) { }
  userLogged = this.authservice.getUserLogged();
  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      this.aboutList = data;
     
      this.about = data[0].about
      this.position=data[0].position
      console.log(this.about)
    })
  //   this.about = this.miPortfolio.about;
  //  this.position = this.miPortfolio.position;
    
    
  }

  cambiar_parrafo(){
    document.getElementById("editableAb")!.style.display = "block";

    console.log(this.aboutList)
  };

  sendPutRequest(img:any,pos:any,about:any): Observable<any> {
    const requestOptions: Object = {
      /* other options here */
      responseType: 'text'
    }
    const params = new HttpParams()
      
      .set("img", img)
      .set("position",pos)
      .set("about",about);
      const httpParams =params.toString()
    return this.http.put<any>(`https://arg-prog-backend.herokuapp.com/about/editar/26?`+httpParams,requestOptions);
  }
  actualizar_datos(){
    const img = (<HTMLInputElement>document.getElementById("fotoAb"))?.value;
    const pos = (<HTMLInputElement>document.getElementById("posicionAb"))?.value;
    const about = (<HTMLInputElement>document.getElementById("acercaDe"))?.value;
    const f = JSON.stringify({"img":img, "position": pos, "about" : about})
    const obj = JSON.parse(f)
   document.getElementById("editableAb")!.style.display = "none";
   this.sendPutRequest(img,pos,about).subscribe((res: any) => {})
    //console.log(obj);
  }

}
