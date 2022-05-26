import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  constructor() { 
  
  }

  ngOnInit(): void {
  }

  cambiar_parrafo(){
    document.getElementById("editText")!.style.display="block";
    let texto = document.getElementById("texto")!.innerText;
    console.log(texto)
  };

  text_change(value : string){
    document.getElementById("texto")!.innerText=value;
  }

}
