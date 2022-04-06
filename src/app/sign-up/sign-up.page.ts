import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService, User } from '../welcome/service.service';

=======
import { RegistroService } from '../services/registro.service';
import { NgForm } from '@angular/forms';
import { UsuarioInterface } from '../models/usuario-model';
>>>>>>> ad328e80fe2ba3bfa3e03aa9f924ae36eaf36303
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
<<<<<<< HEAD
  name : string
  email : string
  password : string
  password_confirmation : string

  constructor(private service : ServiceService, private router : Router) { }
=======
  data = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  };

  constructor(private api: RegistroService) {}
>>>>>>> ad328e80fe2ba3bfa3e03aa9f924ae36eaf36303

  ngOnInit() {}

<<<<<<< HEAD
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
=======
  onSubmit(form: NgForm) {
    console.log(form.value);
    this.api.registro(form.value).subscribe((res) => {
      console.log(res);
    });
>>>>>>> ad328e80fe2ba3bfa3e03aa9f924ae36eaf36303
  }
}
