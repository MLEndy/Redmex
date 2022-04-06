import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Hist, ServiceService } from '../service.service';

@Component({
  selector: 'app-tv-modal-page',
  templateUrl: './tv-modal-page.page.html',
  styleUrls: ['./tv-modal-page.page.scss'],
})
export class TvModalPagePage implements OnInit {

  //Datos
  reqId
  Serie : any = {}
  Season = []
  selectedSegment : string = 'info'
  isInFav : string = 'bookmark-outline'

  constructor(private modalController : ModalController, private service : ServiceService) { }

  ngOnInit() {
    this.InitializeSerie()
  }

  //Inicializa la serie, de ahí obtiene las temporadas
  InitializeSerie(){
    this.service.getOneSerie(this.reqId).subscribe(serie =>{
      this.Serie = {
        id: serie.id,
        name: serie.name,
        desc: serie.overview,
        image: 'http://image.tmdb.org/t/p/original/' + serie.backdrop_path,
        vote: serie.vote_average,
        firstDate: serie.first_air_date,
        prod: serie.in_production,
        aut: serie.created_by,
        genres: serie.genres,
        lastDate: serie.last_air_date
      }

      this.InitializeSeasons(serie.number_of_seasons)
    })
  }

  //Guarda las temporadas en otra variable para mostrarlas y cada una tiene su lista de capítulos
  InitializeSeasons(seasons: number){
    for(let i = 0; i < seasons; i++){
      this.service.getTvSeasons(this.reqId, (i+1)).subscribe(season =>{
        this.Season.push({
          id: season.id,
          name: season.name,
          temporal: season.poster_path,
          poster: ('http://image.tmdb.org/t/p/original/' + season.poster_path),
          chapters: season.episodes,
        })
      })

      this.service.getFavs().subscribe(response => {
        response.data.forEach(element => {
          if(element.media_id == this.Serie.id){
            this.isInFav = 'bookmark'
          }
        });
      })
    }
  }

  //Al dar en play guarda en el historial el nombre de la serie y capítulo
  playButton(chapter){
    const hist : Hist = {
      "media_id" : this.Serie.id,
      "media_type" : 'tv',
      "media_name" : this.Serie.name +': '+ chapter.name,
      "media_overview" : this.Serie.desc,
      "media_genre" : this.Serie.genres[0].name,
      "media_vote" : this.Serie.vote,
      "media_img" : this.Serie.image,
      "usuario_email" : localStorage.getItem("email")
    }

    this.service.putHistorial(hist).subscribe(Response =>{
      if(Response.status == 'ok'){
        this.dismiss()
      }
    })
  }

  //Al dar en favoritos guarda nomás la serie en favoritos
  addFav(){
    const hist : Hist = {
      "media_id" : this.Serie.id,
      "media_type" : 'tv',
      "media_name" : this.Serie.name,
      "media_overview" : this.Serie.desc,
      "media_genre" : this.Serie.genres[0].name,
      "media_vote" : this.Serie.vote,
      "media_img" : this.Serie.image,
      "usuario_email" : localStorage.getItem("email")
    }

    //Determina si ya está en favorito o no para dar un aviso de forma visual
    if(this.isInFav == 'bookmark'){
      this.service.deleteFavs(this.Serie.id).subscribe(response =>{
        this.isInFav = 'bookmark-outline'
      })
    }else{
      this.service.putFavs(hist).subscribe(Response =>{
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

  segmentChanged(ev: any) {
    this.selectedSegment=ev.target.value
    
  }

}
