import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-play-video',
  templateUrl: './play-video.component.html',
  styleUrls: ['./play-video.component.scss']
})

export class PlayVideoComponent implements OnInit {
  id: string;
  link: string;
  urlSafe: SafeResourceUrl;

  constructor(private route: ActivatedRoute, public sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
          console.log(params);
          this.id = params.id;
          this.link = "https://www.youtube.com/embed/" + this.id;
          this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.link);
        }
      );
  }
}
