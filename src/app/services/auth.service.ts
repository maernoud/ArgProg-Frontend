import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  currentUserSubjectg:BehaviorSubject<any>
  public ingresare = false;
  public logueado = this.getUserLogged()
  public logueadoNot = !this.logueado
  
  constructor(private afauth: AngularFireAuth, private http:HttpClient) { 
    this.currentUserSubjectg= new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser')||'{}'))
    }

  async login(email:string,password:string){
    try{
      return await this.afauth.signInWithEmailAndPassword(email, password);
      
    }catch(err){
        console.log("error en login: ", err);
        return null;
    }
  }

  getUserLogged(){
    return this.afauth.authState;
  }


  logout(){
    this.afauth.signOut();
    console.log('deslogueado')
  }
  ingresarbutton(){
    
  this.ingresare = !this.ingresare;
    console.log(this.ingresare);
  }
}
