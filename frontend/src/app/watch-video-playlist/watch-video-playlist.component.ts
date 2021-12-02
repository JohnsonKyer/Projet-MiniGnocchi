import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: 'app-watch-video-playlist',
  templateUrl: './watch-video-playlist.component.html',
  styleUrls: ['./watch-video-playlist.component.scss']
})
export class WatchVideoPlaylistComponent implements OnInit {
  id: string;
  title: string;
  link: string;
  idPlaylist: string;
  urlSafe: SafeResourceUrl;
  del: number = 0;
  addPlaylist: number = 1;
  url: string = 'http://127.0.0.1:3000/playlistsRetrait/';


  constructor(private route: ActivatedRoute, public sanitizer: DomSanitizer, private httpClient: HttpClient, private flashMessage: FlashMessagesService) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.id = params.id;
        this.idPlaylist = params.idPlaylist;
        this.title = params.title;
        if(params.del==1){
          this.del=1;
          this.addPlaylist=0;
          console.log(params)
        }


      })
    this.link = "https://www.youtube.com/embed/" + this.id;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.link);

  }

  deleteVideo(): void {
    this.httpClient
      .patch(this.url + this.idPlaylist, {
        id: this.id
      }, { responseType: 'text' })
      .subscribe(
        res => {
          this.flashMessage.show('La vidéo a bien été supprimée de votre playlist.', { cssClass: 'alert-success', timeout: 3000 });
          this.del = 1;
          this.addPlaylist = 0;
        },
        error => {
          console.log(error);
        });
  }
}