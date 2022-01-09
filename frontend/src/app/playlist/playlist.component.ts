import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "../services/token-storage.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  url: string = environment.debutBackend + '/playlistsFromUser/';
  urlNewPlaylist: string = environment.debutBackend + '/playlists';
  urlRenamePlaylist: string = environment.debutBackend + '/playlistsRename/';
  id: string;

  validatingForm: FormGroup;
  playlists: any;

  constructor(private httpClient: HttpClient, private token: TokenStorageService, private router: Router) {
  }

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
      newNamePlaylist: new FormControl('', Validators.required),
    });
  }

  playlist(id: string, titre: string): void {
    this.router.navigate(['/videoPlaylist'], {queryParams: {id: id, titre: titre}});
  }

  get namePlaylist() {
    return this.validatingForm.get('namePlaylist');
  }

  get newNamePlaylist() {
    return this.validatingForm.get('newNamePlaylist');
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

  deletePlaylist(id: string): void {
    this.httpClient
      .delete(this.urlNewPlaylist + "/" + id, {responseType: 'text'})
      .subscribe(
        () => {
          this.ngOnInit()
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  setId(id: string): void {
    this.id = id;
  }

  renamePlaylist(): void {
    this.httpClient
      .patch(this.urlRenamePlaylist + this.id, {titre: this.newNamePlaylist.value}, {responseType: 'text'})
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
