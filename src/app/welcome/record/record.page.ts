import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MovieModalPagePage } from '../movie-modal-page/movie-modal-page.page';
import { ServiceService } from '../service.service';
import { TvModalPagePage } from '../tv-modal-page/tv-modal-page.page';

@Component({
  selector: 'app-record',
  templateUrl: './record.page.html',
  styleUrls: ['./record.page.scss'],
})
export class RecordPage implements OnInit {
  //Datos
  Hist : any = []

  constructor(private service : ServiceService, private modalCtrl : ModalController) { }

  //Inicializa los datos del historial
  ngOnInit() {
    this.service.getHistorial().subscribe(response =>{
      response.data.forEach(element =>{
        this.Hist.push({
          id: element.media_id,
          name : element.media_name,
          vote : element.media_vote,
          image : element.media_img,
          type : element.media_type
        })
      })
    })
  }
 //Abre modales de películas, series e identifica a cada uno según el tipo
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

  buttonSelector(id, type){
    if(type == "movie"){
      this.openMovie(id)
    }else if(type == "tv"){
      this.openTv(id)
    }
  }

}
