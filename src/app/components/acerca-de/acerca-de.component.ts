import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { HttpClient } from '@angular/common/http';
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

  sendPutRequest(data: any): Observable<any> {
    const requestOptions: Object = {
      /* other options here */
      responseType: 'text'
    }
    return this.http.post<any>(`https://arg-prog-backend.herokuapp.com/about/editar`, data, requestOptions);
  }
  actualizar_datos(){
    const img = (<HTMLInputElement>document.getElementById("fotoAb"))?.value;
    const pos = (<HTMLInputElement>document.getElementById("posicionAb"))?.value;
    const about = (<HTMLInputElement>document.getElementById("acercaDe"))?.value;
    const f = JSON.stringify({"img":img, "position": pos, "about" : about})
    const obj = JSON.parse(f)
   document.getElementById("editableAb")!.style.display = "none";
   this.sendPutRequest(obj).subscribe((res: any) => {})
    //console.log(obj);
  }

}
