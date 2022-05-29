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
  miPortfolio:any;
  constructor(private datosPortfolio: PortfolioService,private authservice : AuthService,private http:HttpClient) { }
  userLogged = this.authservice.getUserLogged();
  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      // console.log(data)
      this.miPortfolio = data;
    });
  }

  cambiar_parrafo(){
    document.getElementById("editableAb")!.style.display = "block";

    //console.log("llamada funcion cambiar_parrafo")
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
