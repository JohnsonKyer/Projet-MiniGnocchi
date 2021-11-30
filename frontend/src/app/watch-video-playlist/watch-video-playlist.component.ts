import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-watch-video-playlist',
  templateUrl: './watch-video-playlist.component.html',
  styleUrls: ['./watch-video-playlist.component.scss']
})
export class WatchVideoPlaylistComponent implements OnInit {
  id: string;
  title: string;
  link: string;
  urlSafe: SafeResourceUrl;


  constructor(private route: ActivatedRoute, public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.id = params.id;
        this.title = params.title;
      })
    this.link = "https://www.youtube.com/embed/" + this.id;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.link);

  }

}
