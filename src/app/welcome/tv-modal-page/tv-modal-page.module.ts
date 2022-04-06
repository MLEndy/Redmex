import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TvModalPagePageRoutingModule } from './tv-modal-page-routing.module';

import { TvModalPagePage } from './tv-modal-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TvModalPagePageRoutingModule
  ],
  declarations: [TvModalPagePage]
})
export class TvModalPagePageModule {}
