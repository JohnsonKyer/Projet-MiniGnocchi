import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "../services/token-storage.service";

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
  id: string;
  videosBool: number = 0;
  videoBool: number = 1;
  urlSafe: SafeResourceUrl;
  url: string = 'http://127.0.0.1:3000/historique/';


  constructor(public sanitizer: DomSanitizer,private httpClient: HttpClient,private token: TokenStorageService) { }

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
    this.videosBool=0;
    this.videoBool=1;
  }

  watchVideo(video: any){
    this.miniature=video.miniature;
    this.title = video.title;
    this.link = "https://www.youtube.com/embed/" + video.id;
    this.id=video.id
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.link);
    this.videosBool=1;
    this.videoBool=0;
    this.httpClient
      .patch(this.url+JSON.parse(this.token.getUser()).id,{
        "videos":{
          "id":this.id,
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
