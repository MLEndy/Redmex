import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovieModalPagePageRoutingModule } from './movie-modal-page-routing.module';

import { MovieModalPagePage } from './movie-modal-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovieModalPagePageRoutingModule
  ],
  declarations: [MovieModalPagePage]
})
export class MovieModalPagePageModule {}
