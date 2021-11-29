import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FlashMessagesService} from "angular2-flash-messages";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-button-playlist',
  templateUrl: './button-playlist.component.html',
  styleUrls: ['./button-playlist.component.scss']
})
export class ButtonPlaylistComponent implements OnInit {
  url: string = 'http://127.0.0.1:3000/playlistsFromUser/';
  urlNewPlaylist: string = 'http://127.0.0.1:3000/playlists';
  urlAdd: string = 'http://127.0.0.1:3000/playlistsAjout/';
  urlDel: string = 'http://127.0.0.1:3000/playlistsRetrait/';
  urlEdit: string = 'http://127.0.0.1:3000/playlistsRename/';
  playlistName : any;
  @Input() miniature : string;
  @Input() title : string;
  @Input() id : string;
  validatingForm: FormGroup;
  constructor(private httpClient: HttpClient,private flashMessage: FlashMessagesService, private token: TokenStorageService) {
  }

  ngOnInit(): void {
    this.httpClient
      .get(this.url+JSON.parse(this.token.getUser()).id)
      .subscribe(
        (data) => {
          this.playlistName = data
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
    this.validatingForm = new FormGroup({
      namePlaylist: new FormControl('', Validators.required),
    });
  }
  get namePlaylist() {
    return this.validatingForm.get('namePlaylist');
  }

  newPlaylist() : void{
    this.httpClient
      .post(this.urlNewPlaylist,{
        "titre": this.namePlaylist.value,
        "idUtilisateur":JSON.parse(this.token.getUser()).id
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

  addVideo(idPlaylist : string): void{
    this.httpClient
      .patch(this.urlAdd+idPlaylist,{
        "videos":{
          "id":this.id,
          "provenance":"youtube",
          "miniature":this.miniature,
          "title":this.title
        }
      }, {responseType: 'text'})
      .subscribe(
        res => {
          this.flashMessage.show('La vidéo a bien été ajoutée a votre playlist.', { cssClass: 'alert-success', timeout: 3000 });
        },
        error => {
          console.log(error);
        });
  }
}
