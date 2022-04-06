import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MovieModalPagePage } from '../movie-modal-page/movie-modal-page.page';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})

export class MoviesPage implements OnInit {

  //Esta variable sustituye a el link de la api para obtener las imágenes
  imageURL : string = 'http://image.tmdb.org/t/p/original/'

  //Configuración de los sliders, 1 de banner principal, 3 de tamaños
  bannerOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay:true
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

  extraOpts = {
    slidesPerView: 2.7,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  }

  extraOpts2 = {
    slidesPerView: 1.9,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  }

  //Variables a tomar para mostrar info
  BannerVar : any = []
  PopularVar : any = []
  UpcomingVar : any = []
  TopVar : any = []
  WatchingVar : any = []
  AutVar : any = []

  constructor(private modalCtrl : ModalController, private service : ServiceService) { }

  //Se inicializan las variables
  ngOnInit() {
    this.InitializeBanner()
    this.InitializePopular()
    this.InitializeUpcoming()
    this.InitializeTop()
    this.InitializeWatchingNow()
    this.InitializeAut()
  }

  //Obtiene 7 imágenes para el banner
  InitializeBanner(){
    this.service.getTopRated('movie').subscribe(top => {
      top.results.slice(-7).forEach(top =>{
        this.BannerVar.push({
          id: top.id,
          poster: this.imageURL + top.poster_path,
        })
      })
    })
  }

  //Obtiene el slider de Popular (Posters)
  InitializePopular(){
    this.service.getPopular('movie', 1).subscribe(pop =>{
      pop.results.forEach(pop =>{
        this.PopularVar.push({
          id: pop.id,
          poster: this.imageURL + pop.poster_path
        })
      })
    })
  }

  //Obtiene el slider de proximamente (imagenes)
  InitializeUpcoming(){
    this.service.getUpcoming().subscribe(up =>{
      up.results.forEach(up =>{
        if(up.backdrop_path != null){
          this.UpcomingVar.push({
            id: up.id,
            image: this.imageURL + up.backdrop_path
          })
        }
      })
    })
  }

  //Inicializa el slider de selección del autor (poster)
  InitializeAut(){
    this.service.getPopular('movie', 2).subscribe(aut =>{
      aut.results.forEach(aut =>{
        this.AutVar.push({
          id: aut.id,
          poster: this.imageURL + aut.poster_path
        })
      })
    })
  }

  //Obtiene el top de películas (poster)
  InitializeTop(){
    this.service.getTopRated('movie').subscribe(top =>{
      top.results.forEach(top =>{
        this.TopVar.push({
          id: top.id,
          poster: this.imageURL + top.poster_path
        })
      })
    })
  }

  //Obtiene las películas que ahora mira la gente(imagen)
  InitializeWatchingNow(){
    this.service.getWatchingNow().subscribe(watch =>{
      watch.results.forEach(watch =>{
        this.WatchingVar.push({
          id: watch.id,
          image: this.imageURL + watch.backdrop_path
        })
      })
    })
  }

  //Abre el modal de películas
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

}
