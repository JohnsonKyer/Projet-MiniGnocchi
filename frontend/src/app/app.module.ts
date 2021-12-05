import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegisterComponent} from './register/register.component';
import {MessageService} from './message.service';
import {HttpClientModule} from '@angular/common/http';
import {SearchVideoComponent} from './search-video/search-video.component';
import {IconsModule, InputsModule, MDBRootModule} from 'angular-bootstrap-md';
import {DisplayVideosComponent} from './display-videos/display-videos.component';
import {PlayVideoComponent} from './play-video/play-video.component';
import {HomeComponent} from './home/home.component';
import {ButtonPlaylistComponent} from './button-playlist/button-playlist.component';
import {NgbCollapseModule, NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {LoginComponent} from './login/login.component';
import {authInterceptorProviders} from './_helpers/auth.interceptor';
import {PlaylistComponent} from './playlist/playlist.component';
import {VideoPlaylistComponent} from './video-playlist/video-playlist.component';
import {ProfilUtilisateurComponent} from './profil-utilisateur/profil-utilisateur.component';
import {FormChangeMdpComponent} from './forms_utilisateur/form-change-mdp/form-change-mdp.component';
import {FormChangeMailComponent} from './forms_utilisateur/form-change-mail/form-change-mail.component';
import {WatchVideoPlaylistComponent} from './watch-video-playlist/watch-video-playlist.component';
import {HistoryComponent} from './history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    RegisterComponent,
    LoginComponent,
    SearchVideoComponent,
    DisplayVideosComponent,
    PlayVideoComponent,
    HomeComponent,
    ButtonPlaylistComponent,
    PlaylistComponent,
    VideoPlaylistComponent,
    ProfilUtilisateurComponent,
    FormChangeMdpComponent,
    FormChangeMailComponent,
    VideoPlaylistComponent,
    WatchVideoPlaylistComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    IconsModule,
    InputsModule,
    NgbDropdownModule,
    FlashMessagesModule.forRoot(),
    MDBRootModule,
    ReactiveFormsModule,
    NgbCollapseModule
  ],
  providers: [MessageService, authInterceptorProviders, LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
