import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FlashMessagesService} from "angular2-flash-messages";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-button-playlist',
  templateUrl: './button-playlist.component.html',
  styleUrls: ['./button-playlist.component.scss']
})
export class ButtonPlaylistComponent implements OnInit {
  url: string = 'http://127.0.0.1:3000/playlistsFromUser/';
  urlNewPlaylist: string = 'http://127.0.0.1:3000/playlists';
  urlAdd: string = 'http://127.0.0.1:3000/playlists/';
  playlistName : any;
  @Input() id : string;
  validatingForm: FormGroup;
  constructor(private httpClient: HttpClient,private flashMessage: FlashMessagesService) {
  }

  ngOnInit(): void {
    this.httpClient
      .get(this.url+"313233343536373839313233")
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
    console.log(this.namePlaylist.value)
    this.httpClient
      .post(this.urlNewPlaylist,{
        "titre": this.namePlaylist.value,
        "idUtilisateur":"313233343536373839313233"
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
        "action":"edit",
        "videos":{
          "idVideo":this.id,
          "provenance":"youtube"
        }
      }, {responseType: 'text'})
      .subscribe(
        res => {
          console.log('received ok response from patch request');
          this.flashMessage.show('La vidéo a bien été ajoutée a votre playlist.', { cssClass: 'alert-success', timeout: 3000 });
        },
        error => {
          console.error('There was an error during the request');
          console.log(error);
        });
  }
}
