import { Component, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;

  //Configuración inicial del slider
  slideOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };

  ngOnInit(){
    //Al iniciar detecta si existe el token para dirigirse
    //a la pantalla principal
    if(localStorage.getItem('token') == null){
      
    }else{
      this.router.navigate(['welcome/principal'])
    }
  }

  constructor(private router : Router) {}

  //Funciones que redirigen al login y página de registro respectivamente
  goToLogin(){
    this.router.navigate(['/login'])
  }

  goToSignUp(){
    this.router.navigate(['/sign-up'])
  }

}
