import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  //Datos
  User : any = {}

  constructor(private toastController : ToastController, private service : ServiceService, private router : Router) { }

  ngOnInit() {
    //Al inciar obtiene los datos del usuario nada más
    this.service.getUser().subscribe(response =>{
    this.User = {
      "name" : response.data.name,
      "mail" : response.data.email,
      "Substracted" : response.data.name.substring(0, 1).toUpperCase()
    }
  })}

  async logout() {
    //Imprime un toast que a su vez llama a la función de loggout e imprime la respuesta, posteriormente manda a home
    const toast = await this.toastController.create({
      message: this.service.loggout(),
      duration: 2000
    });
    toast.present();
    this.router.navigate(['/home'])
  }

}
