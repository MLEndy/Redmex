import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService, User } from '../service.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  //Guardan los valores de los inputs
  name
  email
  pass
  conf

  constructor(private service : ServiceService, private router : Router) { }

  ngOnInit() {
  }

  //Llama al service la función de actualizar, si los cambios se concretan, se regresará a 
  //La pantalla principal
  onSubmit(f){
    const user : User = {
      "name" : this.name,
      "email" : this.email,
      "password" : this.pass,
      "password_confirmation" : this.conf
    }

    this.service.updateUser(user).subscribe(response =>{
      if(response.status == 'ok'){
        this.router.navigate(['/welcome/principal'])
      }
    })

  }

}
