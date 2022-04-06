import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MovieModalPagePage } from '../movie-modal-page/movie-modal-page.page';
import { ServiceService } from '../service.service';
import { TvModalPagePage } from '../tv-modal-page/tv-modal-page.page';

@Component({
  selector: 'app-fav',
  templateUrl: './fav.page.html',
  styleUrls: ['./fav.page.scss'],
})
export class FavPage implements OnInit {

  //Datos
  Favourites : any = []

  constructor(private service : ServiceService, private modalCtrl : ModalController) { }

  ngOnInit() {
    //Inicializa los datos
    this.InitializeFavs()
  }

  /*Obtiene los favoritos, estos vienen de la base de datos de hostinger, no de tmdb, por lo que
  la presentación es algo distinta pero los datos obtenidos son iguales a los de tmdb*/ 
  InitializeFavs(){
    this.service.getFavs().subscribe(response =>{
      this.Favourites = []
      response.data.forEach(element => {
        var desc = element.media_overview.substring(1, 150) + '...'
        this.Favourites.push({
          id: element.media_id,
          name : element.media_name,
          desc : desc,
          vote : element.media_vote,
          image : element.media_img,
          type : element.media_type
        })
      })
    })
  }

  //Abre modal de películas
  async openMovie(id){
    const modal = await this.modalCtrl.create({
      component: MovieModalPagePage,
      componentProps: {reqId: id},
      initialBreakpoint: 0.6,
      breakpoints: [0,0.6,1],
      cssClass: 'movie-modal-page'
    })

    return await modal.present()
  }

  //Abre modal de series
  async openTv(id){
    const modal = await this.modalCtrl.create({
      component: TvModalPagePage,
      componentProps: {reqId: id},
      initialBreakpoint: 0.6,
      breakpoints: [0, 0.3, 0.6, 1],
      cssClass: 'tv-modal-page'
    })

    return await modal.present()
  }

  //Determina que se ha checho click
  selectorClick(id, type){
    if(type == "movie"){
      this.openMovie(id)
    }else if(type == "tv"){
      this.openTv(id)
    }
  }

  //Acciona el refresher
  doRefresh(event) {
    this.InitializeFavs()

    setTimeout(() => {
      event.target.complete()
    }, 2000)
  }

}
