import { Component, OnInit } from '@angular/core';
import { subscribeOn } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService, private datosPortfolio: PortfolioService) { }

  ngOnInit(): void {
    
  }

}
