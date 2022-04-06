import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Logger, ServiceService } from '../welcome/service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //Variables que obtienen el valor de los inputs
  email
  password

  constructor(private router : Router, private service : ServiceService) { }

  ngOnInit() {}

  //Al dar click en login, se guarda un archivo de tipo Logger y se llama al login de la
  //api, en caso de acceder, se guarda el token y el email dentro de un LocalStorage, 
  //Después, manda a la página principal de la app
  login(){
    const body : Logger = {
      "email" : this.email,
      "password" : this.password
    }
    
    this.service.login(body).subscribe(response =>{
      if(response.status == 'ok'){
        localStorage.setItem("token", response.token)
        localStorage.setItem("email", body.email)
        this.router.navigate(['/welcome/principal'])
      }
    })
  }

  goToWelcome() {
    this.router.navigate(['/welcome/principal']);
  }
}
