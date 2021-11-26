import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-search-video',
  templateUrl: './search-video.component.html',
  styleUrls: ['./search-video.component.scss']
})
export class SearchVideoComponent implements OnInit {
  url: string = 'http://127.0.0.1:3000/searchVideos';
  videos: any;
  nameVideos: string;
  @Output() newItemEvent = new EventEmitter<any>();
  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
  }

  searchVideos() {
    this.httpClient
      .post(this.url,{"nameVideos" : this.nameVideos})
      .subscribe(
        (data) => {
          this.videos=data
          console.log("String json object :", this.videos[0].id);
          this.newItemEvent.emit(this.videos);
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

}
