import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";
import {TokenStorageService} from "../services/token-storage.service";

@Component({
  selector: 'app-video-playlist',
  templateUrl: './video-playlist.component.html',
  styleUrls: ['./video-playlist.component.scss']
})
export class VideoPlaylistComponent implements OnInit {
  id: string;
  idVideo: string;
  videos: any;
  title: string;
  miniature: string;
  link: string;
  urlSafe: SafeResourceUrl;
  titrePlaylist: string;
  url: string = 'http://127.0.0.1:3000/playlists/';
  urlHistory: string = 'http://127.0.0.1:3000/historique/';



  constructor(private route: ActivatedRoute, public sanitizer: DomSanitizer, private httpClient: HttpClient, private router: Router,private token: TokenStorageService) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.id = params.id;
        this.titrePlaylist = params.titre;
      }
      );
    this.httpClient
      .get(this.url + this.id)
      .subscribe(
        (data) => {
          this.videos = data;
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  watchVideo(video: any) {
    console.log(video)
    this.miniature = video.miniature;
    this.title = video.title;
    this.link = "https://www.youtube.com/embed/" + video.id;
    this.idVideo = video.id
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.link);
    this.router.navigate(['/watchVideo'], { queryParams: { id: this.idVideo,idPlaylist:this.id  } });
    this.httpClient
      .patch(this.urlHistory+JSON.parse(this.token.getUser()).id,{
        "videos":{
          "id":this.idVideo,
          "provenance":"youtube",
          "miniature":this.miniature,
          "title":this.title
        }
      }, {responseType: 'text'})
      .subscribe(
        res => {
        },
        error => {
          console.log(error);
        });
  }
}
