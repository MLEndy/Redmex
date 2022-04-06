import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieModalPagePage } from './movie-modal-page.page';

const routes: Routes = [
  {
    path: '',
    component: MovieModalPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieModalPagePageRoutingModule {}
