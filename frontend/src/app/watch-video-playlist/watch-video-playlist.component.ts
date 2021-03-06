import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FlashMessagesService } from 'angular2-flash-messages';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-watch-video-playlist',
  templateUrl: './watch-video-playlist.component.html',
  styleUrls: ['./watch-video-playlist.component.scss']
})
export class WatchVideoPlaylistComponent implements OnInit {
  @ViewChild('buttonpopup') buttonpopup: ElementRef;

  id: string;
  title: string;
  link: string;
  idPlaylist: string;
  urlSafe: SafeResourceUrl;
  del = 0;
  addPlaylist = 1;
  url: string = environment.debutBackend + '/playlistsRetrait/';
  urlGetVideo: string = environment.debutBackend + '/getVideoByIdVideo/';
  urlAnnonceAleatoire: string = environment.debutBackend + '/annonceur/annoncealeatoire';
  test: any;
  miniature: string;
  annonce: any;

  constructor(private route: ActivatedRoute, public sanitizer: DomSanitizer, private httpClient: HttpClient,
              private flashMessage: FlashMessagesService) {
  }

  ngOnInit(): void {
    this.getAnnonce();
    this.route.queryParams
      .subscribe(params => {
        this.id = params.id;
        this.idPlaylist = params.idPlaylist;
        if (params.del == 1) {
          this.del = 1;
          this.addPlaylist = 0;
          console.log(params);
        }
      });
    this.httpClient
      .get(this.urlGetVideo + this.id)
      .subscribe(
        (data) => {
          this.test = data;
          this.miniature = this.test.miniature;
          this.title = this.test.title;
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );


    this.link = 'https://www.youtube.com/embed/' + this.id;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.link);

  }

  deleteVideo(): void {
    this.httpClient
      .patch(this.url + this.idPlaylist, {
        id: this.id
      }, {responseType: 'text'})
      .subscribe(
        res => {
          this.flashMessage.show('La vid??o a bien ??t?? supprim??e de votre playlist.', {
            cssClass: 'alert-success',
            timeout: 3000
          });
          this.del = 1;
          this.addPlaylist = 0;
        },
        error => {
          console.log(error);
        });
  }

  getAnnonce(): void {
    // L'annonce est affich??e 1 fois sur 3
    if (Math.floor(Math.random() * 3) === 0) {
      this.httpClient.get(this.urlAnnonceAleatoire).subscribe(res => {
        this.annonce = res;
        document.getElementById('buttonpopup').click();
      });
    }
  }
}
