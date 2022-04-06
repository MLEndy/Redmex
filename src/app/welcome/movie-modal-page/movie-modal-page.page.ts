import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Hist, ServiceService } from '../service.service';

@Component({
  selector: 'app-movie-modal-page',
  templateUrl: './movie-modal-page.page.html',
  styleUrls: ['./movie-modal-page.page.scss'],
})
export class MovieModalPagePage implements OnInit {

  //Datos que se usan para mostrar información
  reqId
  movie : any = {}
  history : Hist
  isInFav : string = 'bookmark-outline'

  constructor(private modalController : ModalController, private service : ServiceService) { }

  ngOnInit() {
    this.InitializeMovie()
  }

  //Obtiene los datos de la película en base a la id
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

      this.InitializeHistory()

      //Corrobora si la película está en favoritos o no
      this.service.getFavs().subscribe(response => {
        response.data.forEach(element => {
          if(element.media_id == this.movie.id){
            this.isInFav = 'bookmark'
          }
        });
      })
    })
  }

  //Inicializa los datos de la película en una variable para poder guardarlo en historial o favoritos
  InitializeHistory(){
    this.history = {
      "media_id" : this.movie.id,
      "media_type" : 'movie',
      "media_name" : "" + this.movie.title,
      "media_overview" : "_" +  this.movie.desc,
      "media_genre" : "" +  this.movie.genres[0].name,
      "media_vote" : "" +  this.movie.vote,
      "media_img" : "" +  this.movie.image,
      "usuario_email" : localStorage.getItem("email")
    }
  }

  //Guarda en historial
  mirar(){
    this.service.putHistorial(this.history).subscribe(response =>{
      if(response.status = 'ok'){
        this.dismiss()
      }
    })
  }

  //Añade a favoritos
  addFav(){
    if(this.isInFav == 'bookmark'){
      this.service.deleteFavs(this.movie.id).subscribe(response =>{
        this.isInFav = 'bookmark-outline'
      })
    }else{
      this.service.putFavs(this.history).subscribe(Response =>{
        this.isInFav = 'bookmark'
      })
    }
  }

  //Cierra el modal
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
