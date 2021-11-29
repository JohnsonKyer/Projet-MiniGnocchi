import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-video-playlist',
  templateUrl: './video-playlist.component.html',
  styleUrls: ['./video-playlist.component.scss']
})
export class VideoPlaylistComponent implements OnInit {
  id: string;
  videos: any[] = [];
  title: string;
  link: string;
  videosBool: number = 0;
  videoBool: number = 1;
  urlSafe: SafeResourceUrl;

  constructor(private route: ActivatedRoute,public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
          this.id = params.id;
        }
      );
  }

  watchVideo(video: any){
    this.title = video.title;
    this.link = "https://www.youtube.com/embed/" + video.id;
    this.id=video.id
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.link);
    this.videosBool=1;
    this.videoBool=0;
  }
}
