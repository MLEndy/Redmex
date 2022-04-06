import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TvshowPageRoutingModule } from './tvshow-routing.module';

import { TvshowPage } from './tvshow.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TvshowPageRoutingModule
  ],
  declarations: [TvshowPage]
})
export class TvshowPageModule {}
