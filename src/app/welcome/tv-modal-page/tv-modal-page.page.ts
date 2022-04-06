import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-tv-modal-page',
  templateUrl: './tv-modal-page.page.html',
  styleUrls: ['./tv-modal-page.page.scss'],
})
export class TvModalPagePage implements OnInit {

  reqId
  Serie = {}
  Season = []
  selectedSegment : string = 'info'

  constructor(private modalController : ModalController, private service : ServiceService) { }

  ngOnInit() {
    this.InitializeSerie()
  }

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
    }
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  segmentChanged(ev: any) {
    this.selectedSegment=ev.target.value
    
  }

}
