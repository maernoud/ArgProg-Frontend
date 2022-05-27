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

  cambiar_parrafo(){
    document.getElementById("editText")!.style.display="block";
    let texto = document.getElementById("texto")!.innerText;
    console.log(texto)
  };

  text_change(value : string){
    document.getElementById("texto")!.innerText=value;
  }

}
