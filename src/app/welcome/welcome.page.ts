import { Component, OnInit } from '@angular/core';
import { ServiceService } from './service.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})

export class WelcomePage implements OnInit {

  constructor(private service : ServiceService) { }

  //Carga una variable llamada que funciona como Header dentro del
  //HttpClient para poder realizar las consultas
  ngOnInit() {
    this.service.InitialiceHeaders()
  }

}
