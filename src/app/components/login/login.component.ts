import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario = {
    email: '',
    password: ''
  }

  constructor(public authService: AuthService) { 

  }


  ngOnInit(): void {
    
  }
  Ingresar(){
        const {email, password} = this.usuario;
    this.authService.login(email,password).then(res => {
      console.log('logueado')
       })
       
       
       
       
       this.authService.ingresarbutton();
  }
  
}
