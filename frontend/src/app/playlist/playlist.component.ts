import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "../services/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  url: string = 'http://127.0.0.1:3000/playlistsFromUser/';
  playlists : any;
  constructor(private httpClient: HttpClient,private token: TokenStorageService,private router: Router) { }

  ngOnInit(): void {
    this.httpClient
      .get(this.url+JSON.parse(this.token.getUser()).id)
      .subscribe(
        (data) => {
          this.playlists = data
          console.log(data)
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  playlist(id : string):void{
    this.router.navigate(['/videoPlaylist'], {queryParams:{ id: id }});
  }

}
