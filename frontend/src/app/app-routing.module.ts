import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthGuard} from './services/auth.guard';
import {HomeComponent} from './home/home.component';
import {PlaylistComponent} from './playlist/playlist.component';
import {VideoPlaylistComponent} from './video-playlist/video-playlist.component';
import {WatchVideoPlaylistComponent} from './watch-video-playlist/watch-video-playlist.component';
import {HistoryComponent} from './history/history.component';
import {ProfilUtilisateurComponent} from './profil-utilisateur/profil-utilisateur.component';
import {ReverseAuthGuard} from './services/reverse-auth.guard';
import {TestUploadComponent} from './test-upload/test-upload.component';
import {AnnonceComponent} from './annonce/annonce.component';
import {AnnonceDetailComponent} from './annonce-detail/annonce-detail.component';
import {ModerateurComponent} from './moderateur/moderateur.component';
import {AuthannonceurGuard} from './services/authannonceur.guard';
import {AuthmodGuard} from "./services/authmod.guard";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'register',
    component: RegisterComponent
  },
  {path: 'uploadAnnonce', canActivate: [AuthannonceurGuard], component: TestUploadComponent},
  {path: 'annonce-detail', canActivate: [AuthannonceurGuard], component: AnnonceDetailComponent},
  {path: 'annonce', canActivate: [AuthannonceurGuard], component: AnnonceComponent},
  {
    path: 'login', canActivate: [ReverseAuthGuard],
    component: LoginComponent
  }, {
    path: 'home', canActivate: [AuthGuard],
    component: HomeComponent
  }, {
    path: 'playlist', canActivate: [AuthGuard],
    component: PlaylistComponent
  }, {
    path: 'videoPlaylist', canActivate: [AuthGuard],
    component: VideoPlaylistComponent
  }, {
    path: 'watchVideo', canActivate: [AuthGuard],
    component: WatchVideoPlaylistComponent
  }, {
    path: 'history', canActivate: [AuthGuard],
    component: HistoryComponent
  }, {
    path: 'profilUtilisateur', canActivate: [AuthGuard], component: ProfilUtilisateurComponent
  },
  {path: 'moderation', component: ModerateurComponent, canActivate: [AuthmodGuard]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
