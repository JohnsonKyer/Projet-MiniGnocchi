import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlaylistsComponent } from './pages/playlists/playlists.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { MessageService } from './message.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SearchVideoComponent } from './search-video/search-video.component';
import {IconsModule, InputsModule} from "angular-bootstrap-md";
import { DisplayVideosComponent } from './display-videos/display-videos.component';
import { PlayVideoComponent } from './play-video/play-video.component';
import { HomeComponent } from './home/home.component';
import { ButtonPlaylistComponent } from './button-playlist/button-playlist.component';
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
@NgModule({
  declarations: [
    AppComponent,
    PlaylistsComponent,
    HeaderComponent,
    SidebarComponent,
    RegisterComponent,
    SearchVideoComponent,
    DisplayVideosComponent,
    PlayVideoComponent,
    HomeComponent,
    ButtonPlaylistComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FontAwesomeModule,
        FormsModule,
        HttpClientModule,
        IconsModule,
        InputsModule,
        NgbDropdownModule
    ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
