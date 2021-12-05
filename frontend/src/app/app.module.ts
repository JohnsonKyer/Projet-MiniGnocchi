import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { MessageService } from './message.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SearchVideoComponent } from './search-video/search-video.component';
import {IconsModule, InputsModule, MDBRootModule} from 'angular-bootstrap-md';
import { DisplayVideosComponent } from './display-videos/display-videos.component';
import { PlayVideoComponent } from './play-video/play-video.component';
import { HomeComponent } from './home/home.component';
import { ButtonPlaylistComponent } from './button-playlist/button-playlist.component';
import {NgbCollapseModule, NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { LoginComponent } from './login/login.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { PlaylistComponent } from './playlist/playlist.component';

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
    PlaylistComponent

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
export class AppModule { }
