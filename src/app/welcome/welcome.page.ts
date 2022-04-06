import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})

export class WelcomePage implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 400
  }

  movieOpts = {
    slidesPerView: 1.6,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
