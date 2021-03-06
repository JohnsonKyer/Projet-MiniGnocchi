import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "../services/token-storage.service";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  videos: any[] = [];
  title: string;
  miniature: string;
  link: string;
  idVideo: string;
  urlSafe: SafeResourceUrl;
  urlHistory: string = environment.debutBackend + '/historique/';


  constructor(public sanitizer: DomSanitizer,private httpClient: HttpClient,private token: TokenStorageService,private router: Router) { }

  ngOnInit(): void {
  }
  addItem(newItem: any) {
    this.videos=[];
    for (let element in newItem) {
      this.videos.push({
        title: newItem[element].title,
        id: newItem[element].id,
        link: newItem[element].link,
        miniature: newItem[element].miniature,
      });
    }
  }

  watchVideo(video: any) {
    this.miniature = video.miniature;
    this.title = video.title;
    this.link = "https://www.youtube.com/embed/" + video.id;
    this.idVideo = video.id
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.link);
    this.router.navigate(['/watchVideo'], { queryParams: { del:1 ,id: this.idVideo } });
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
