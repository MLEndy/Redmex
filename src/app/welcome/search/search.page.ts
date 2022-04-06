import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MovieModalPagePage } from '../movie-modal-page/movie-modal-page.page';
import { TvModalPagePage } from '../tv-modal-page/tv-modal-page.page';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  Values : any = []

  constructor(private service : ServiceService, private modalCtrl : ModalController ) { }

  ngOnInit() {

  }

  ionChange(event){
    if(event.detail.value != ''){
      this.Values = []
      this.service.search(event.detail.value).subscribe(s =>{
        s.results.forEach(s =>{
          if(s.backdrop_path != null){
            if(s.media_type == 'tv'){
              this.Values.push({
                id: s.id,
                name: s.name,
                type: s.media_type,
                poster: 'http://image.tmdb.org/t/p/original/' + s.backdrop_path
              })
            }else if(s.media_type == 'movie'){
              this.Values.push({
                id: s.id,
                name: s.title,
                type: s.media_type,
                poster: 'http://image.tmdb.org/t/p/original/' + s.backdrop_path
              })
            }
          }
        })
      })
    }
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

  buttonSelector(id, type){
    if(type == "movie"){
      this.openShare(id)
    }else if(type == "tv"){
      this.openMovie(id)
    }
  }

}
