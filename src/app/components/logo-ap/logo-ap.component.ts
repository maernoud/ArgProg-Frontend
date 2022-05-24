import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logo-ap',
  templateUrl: './logo-ap.component.html',
  styleUrls: ['./logo-ap.component.css']
})
export class LogoAPComponent implements OnInit {

  constructor(private authservice : AuthService) { }

  ngOnInit(): void {
  }

    userLogged = this.authservice.getUserLogged();
   

   logueado() { this.authservice.getUserLogged().subscribe(res =>{
     console.log(res?.email)
   });
   }
  ingresar(){ 
    this.authservice.ingresarbutton();

  }
  logout(){
    this.authservice.logout();
  }

}
