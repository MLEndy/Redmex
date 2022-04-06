import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MovieModalPagePage } from '../movie-modal-page/movie-modal-page.page';
import { ServiceService } from '../service.service';
import { TvModalPagePage } from '../tv-modal-page/tv-modal-page.page';


const imageURL : string = 'http://image.tmdb.org/t/p/original/'

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  slideOpts = {
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

  BannerVar : any = []
  Popular : any = []
  popMv : any = []
  TrendingObject : any = []
  top10 : any = []; topBg : string
  watchNow: any = []
  suggested: any = {}
  Upcoming: any = []
  
  constructor(private modalCtrl : ModalController, private service : ServiceService) { }

  ngOnInit() {
    this.InitializeBanner()
    this.InitializeTrending()
    this.InitializeTopRated()
    this.InitializeWatchingNow()
    this.InitializeTop()
    this.InitializePopular()
    this.InitializeUpcoming()
    
  }

  funcionDPrueba(){
  }

  //Obtiene las imágenes del banner a partir de la función Trending
  InitializeBanner(){
    this.service.getTrending('all').subscribe(discover => {
      discover.results.slice(-7).forEach(discover =>{
        this.BannerVar.push({
          id: discover.id,
          poster: (imageURL + discover.poster_path),
          type: discover.media_type
        })
      })
    })
  }

  //Obtiene el top de las mejores películas
  InitializeTopRated(){
    this.service.getTopRated('movie').subscribe(rated => {
      rated['results'].forEach(rated =>{
        this.popMv.push({
          id: rated.id,
          title: rated.title,
          image: (imageURL+rated.backdrop_path),
          poster: (imageURL + rated.poster_path)
        })
      })
    })
  }

  //Obtiene el trending en general
  InitializeTrending(){
    this.service.getTrending('all').subscribe(trending => {
      trending.results.forEach(trending =>{
        this.TrendingObject.push({
          id: trending.id,
          title: trending.title,
          image: (imageURL+trending.backdrop_path),
          poster: (imageURL+trending.poster_path)
        })
      })
    })
  }

  //Obtiene lo que la gente está mirando
  InitializeWatchingNow(){
    var random = Math.floor(Math.random() * (19 + 0)) + 0;
    this.service.getWatchingNow().subscribe(watch =>{
      watch.results.forEach(watch =>{
        this.watchNow.push({
          id: watch.id,
          title: watch.title,
          poster: (imageURL + watch.poster_path),
          desc: watch.overview
        })
      })
      this.suggested = this.watchNow[random]
    })
  }

  //Obtiene el top 5
  InitializeTop(){
    var random = Math.floor(Math.random() * (5 + 0)) + 0;
    this.service.getTopRated('movie').subscribe(recent =>{
      recent.results.slice(0,5).forEach(recent =>{
        this.top10.push({
          id: recent.id,
          title: recent.title,
          image: (imageURL+recent.backdrop_path),
        })
      })

      this.topBg = this.top10[random].image
    })
  }

  //Obtiene los populares
  InitializePopular(){
    this.service.getPopular('tv').subscribe(pop =>{
      pop.results.forEach(pop =>{
        this.Popular.push({
          id: pop.id,
          image: (imageURL+pop.backdrop_path),
        })
      })
    })
  }

  //Obtiene los próximos lanzamientos
  InitializeUpcoming(){
    this.service.getUpcoming().subscribe(upcoming =>{
      upcoming.results.forEach(upcoming =>{
        if(upcoming.backdrop_path != null){
          this.Upcoming.push({
            id: upcoming.id,
            image: (imageURL+upcoming.backdrop_path),
          })
        }
      })
    })
  }

  async openShare(id){
    const modal = await this.modalCtrl.create({
      component: MovieModalPagePage,
      componentProps: {reqId: id},
      initialBreakpoint: 0.6,
      breakpoints: [0,0.6,1],
      cssClass: 'movie-modal-page'
    })

    return await modal.present()
  }

  async openMovie(id){
    const modal = await this.modalCtrl.create({
      component: TvModalPagePage,
      componentProps: {reqId: id},
      initialBreakpoint: 0.6,
      breakpoints: [0, 0.3, 0.6, 1],
      cssClass: 'tv-modal-page'
    })

    return await modal.present()
  }

  bannerClick(id, type){
    if(type == "movie"){
      this.openShare(id)
    }else if(type == "tv"){
      this.openMovie(id)
    }
  }
}
