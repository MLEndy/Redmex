import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService, User } from '../welcome/service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  //Estas variables toman el valor de los inputs
  name : string
  email : string
  password : string
  password_confirmation : string

  constructor(private service : ServiceService, private router : Router) { }

  ngOnInit() {}

  //Al registrar, se guardan los datos en un tipo de dato User
  //Tras eso, se contacta con la API para hacer el registro en la BD
  onSubmit(form : NgForm){
    const user : User = {
      "name" : this.name,
      "email" : this.email,
      "password" : this.password,
      "password_confirmation" : this.password_confirmation
    }

    this.service.register(user).subscribe(response =>{
      if(response.status == 'ok'){
        this.router.navigate(['/login'])
      }
    })
  }
}
