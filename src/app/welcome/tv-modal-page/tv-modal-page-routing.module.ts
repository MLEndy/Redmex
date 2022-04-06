import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TvModalPagePage } from './tv-modal-page.page';

const routes: Routes = [
  {
    path: '',
    component: TvModalPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TvModalPagePageRoutingModule {}
