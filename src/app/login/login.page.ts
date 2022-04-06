import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
<<<<<<< HEAD
import { Logger, ServiceService } from '../welcome/service.service';
=======
import { LoginService } from '../services/login.service';
>>>>>>> ad328e80fe2ba3bfa3e03aa9f924ae36eaf36303

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  data = {
    name: '',
    email: '',
    password: '',
  };

<<<<<<< HEAD
  email
  password

  constructor(private router : Router, private service : ServiceService) { }
=======
  constructor(private api: LoginService, private router: Router) {}
>>>>>>> ad328e80fe2ba3bfa3e03aa9f924ae36eaf36303

  ngOnInit() {}

<<<<<<< HEAD
  login(){
    const body : Logger = {
      "email" : this.email,
      "password" : this.password
    }
    
    this.service.login(body).subscribe(response =>{
      if(response.status == 'ok'){
        localStorage.setItem("token", response.token)
        this.router.navigate(['/welcome/principal'])
      }
    })
=======
  onSubmit(form: NgForm) {
    this.api.login(form.value).subscribe((res) => {
      console.log(res);
      res.status == 'ok'
        ? this.goToWelcome()
        : alert('Usuario o contraseña incorrectos');
    });
>>>>>>> ad328e80fe2ba3bfa3e03aa9f924ae36eaf36303
  }

  goToWelcome() {
    this.router.navigate(['/welcome/principal']);
  }
}
