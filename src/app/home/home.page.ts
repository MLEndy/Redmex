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

  slideOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };

  ngOnInit(){
    if(localStorage.getItem('token') == null){
      console.log("noai token")
    }else{
      this.router.navigate(['welcome/principal'])
    }
  }

  constructor(private router : Router) {}

  goToLogin(){
    this.router.navigate(['/login'])
  }

  goToSignUp(){
    this.router.navigate(['/sign-up'])
  }

}
