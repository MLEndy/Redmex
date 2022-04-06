import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomePage } from './welcome.page';

const routes: Routes = [
  {
    path: '',
    component: WelcomePage
  },
  {
    path: 'principal',
    loadChildren: () => import('./principal/principal.module').then( m => m.PrincipalPageModule)
  },
  {
    path: 'movies',
    loadChildren: () => import('./movies/movies.module').then( m => m.MoviesPageModule)
  },
  {
    path: 'tvshow',
    loadChildren: () => import('./tvshow/tvshow.module').then( m => m.TvshowPageModule)
  },
  {
    path: 'fav',
    loadChildren: () => import('./fav/fav.module').then( m => m.FavPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'record',
    loadChildren: () => import('./record/record.module').then( m => m.RecordPageModule)
  },
  {
    path: 'movie-modal-page',
    loadChildren: () => import('./movie-modal-page/movie-modal-page.module').then( m => m.MovieModalPagePageModule)
  },
  {
    path: 'tv-modal-page',
    loadChildren: () => import('./tv-modal-page/tv-modal-page.module').then( m => m.TvModalPagePageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomePageRoutingModule {}
