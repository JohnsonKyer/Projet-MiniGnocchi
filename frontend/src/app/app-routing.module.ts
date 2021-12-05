import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthGuard} from './services/auth.guard';
import {HomeComponent} from "./home/home.component";
import {PlaylistComponent} from "./playlist/playlist.component";
import {VideoPlaylistComponent} from "./video-playlist/video-playlist.component";
import {WatchVideoPlaylistComponent} from './watch-video-playlist/watch-video-playlist.component';
import {HistoryComponent} from "./history/history.component";
import { ProfilUtilisateurComponent } from './profil-utilisateur/profil-utilisateur.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home', canActivate: [AuthGuard],
    component: HomeComponent
  },
  {
    path: 'playlist', canActivate: [AuthGuard],
    component: PlaylistComponent
  },
  {
    path: 'videoPlaylist', canActivate: [AuthGuard],
    component: VideoPlaylistComponent
  },
  {
    path: 'watchVideo', canActivate: [AuthGuard],
    component: WatchVideoPlaylistComponent
  },{
    path: 'history', canActivate: [AuthGuard],
    component: HistoryComponent
  }

  },
  {path: 'profilUtilisateur', canActivate: [AuthGuard],
  component: ProfilUtilisateurComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
