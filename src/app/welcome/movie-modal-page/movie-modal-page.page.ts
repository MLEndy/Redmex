import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-movie-modal-page',
  templateUrl: './movie-modal-page.page.html',
  styleUrls: ['./movie-modal-page.page.scss'],
})
export class MovieModalPagePage implements OnInit {

  reqId
  movie : any = {}

  constructor(private modalController : ModalController, private service : ServiceService) { }

  ngOnInit() {
    this.InitializeMovie()
  }

  InitializeMovie(){
    this.service.getOneMovie(this.reqId).subscribe(movie =>{
      
      this.movie = {
        id: movie.id,
        title: movie.title,
        desc: movie.overview,
        image: 'http://image.tmdb.org/t/p/original/' + movie.backdrop_path,
        date: movie.release_date,
        vote: movie.vote_average,
        genres: movie.genres
      }
    })
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
