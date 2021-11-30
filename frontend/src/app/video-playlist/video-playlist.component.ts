import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-video-playlist',
  templateUrl: './video-playlist.component.html',
  styleUrls: ['./video-playlist.component.scss']
})
export class VideoPlaylistComponent implements OnInit {
  id: string;
  videos: any;
  title: string;
  miniature: string;
  link: string;
  urlSafe: SafeResourceUrl;
  titrePlaylist: string;
  url: string = 'http://127.0.0.1:3000/playlists/';


  constructor(private route: ActivatedRoute, public sanitizer: DomSanitizer, private httpClient: HttpClient, private router: Router) { }

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
    this.miniature = video.miniature;
    this.title = video.title;
    this.link = "https://www.youtube.com/embed/" + video.id;
    this.id = video.id
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.link);
    this.router.navigate(['/watchVideoPlaylist'], { queryParams: { id: this.id, title: this.title } });
  }
}
