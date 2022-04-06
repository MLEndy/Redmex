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

  constructor(private toastController : ToastController, private service : ServiceService, private router : Router) { }

  ngOnInit() {
  }

  async logout() {
    const toast = await this.toastController.create({
      message: this.service.loggout(),
      duration: 2000
    });
    toast.present();
    this.router.navigate(['/home'])
  }

}
