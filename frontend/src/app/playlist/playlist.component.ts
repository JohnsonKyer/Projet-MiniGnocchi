import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { TokenStorageService } from "../services/token-storage.service";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  url: string = 'http://127.0.0.1:3000/playlistsFromUser/';
  urlNewPlaylist: string = 'http://127.0.0.1:3000/playlists';
  validatingForm: FormGroup;
  playlists: any;
  constructor(private httpClient: HttpClient, private token: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    this.httpClient
      .get(this.url + JSON.parse(this.token.getUser()).id)
      .subscribe(
        (data) => {
          this.playlists = data
          console.log(data)
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
    this.validatingForm = new FormGroup({
      namePlaylist: new FormControl('', Validators.required),
    });
  }

  playlist(id: string, titre: string): void {
    this.router.navigate(['/videoPlaylist'], { queryParams: { id: id, titre: titre } });
  }

  get namePlaylist() {
    return this.validatingForm.get('namePlaylist');
  }

  newPlaylist(): void {
    this.httpClient
      .post(this.urlNewPlaylist, {
        "titre": this.namePlaylist.value,
        "idUtilisateur": JSON.parse(this.token.getUser()).id
      })
      .subscribe(
        () => {
          this.ngOnInit()
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }
  deletePlaylist(id:string): void{
    this.httpClient
      .delete(this.urlNewPlaylist+"/"+id, {responseType: 'text'})
      .subscribe(
        () => {
          this.ngOnInit()
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }
}
