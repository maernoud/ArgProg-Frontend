import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {

  constructor(private datosPortfolio : PortfolioService, private authservice : AuthService) { }
  
  userLogged = this.authservice.getUserLogged();
  ngOnInit(): void {
  }

}
