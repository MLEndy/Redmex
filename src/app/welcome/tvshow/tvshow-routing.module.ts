import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TvshowPage } from './tvshow.page';

const routes: Routes = [
  {
    path: '',
    component: TvshowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TvshowPageRoutingModule {}
