import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { WelcomePage } from './welcome/welcome.page';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },

  {
    path: 'welcome',
    component: WelcomePage,
    children: [
      {
        path: '',
        loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
      },
      {
        path: 'principal',
        loadChildren: () => import('./welcome/principal/principal.module').then( m => m.PrincipalPageModule )
      },
      {
        path: 'movies',
        loadChildren: () => import('./welcome/movies/movies.module').then( m => m.MoviesPageModule )
      },
      {
        path: 'tvshow',
        loadChildren: () => import('./welcome/tvshow/tvshow.module').then( m => m.TvshowPageModule )
      },
      {
        path: 'fav',
        loadChildren: () => import('./welcome/fav/fav.module').then( m => m.FavPageModule )
      },
      {
        path: 'profile',
        loadChildren: () => import('./welcome/fav/fav.module').then( m => m.FavPageModule )
      },
      {
        path: 'edit-profile',
        loadChildren: () => import('./welcome/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule )
      },
      {
        path: 'record',
        loadChildren: () => import('./welcome/record/record.module').then( m => m.RecordPageModule )
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
