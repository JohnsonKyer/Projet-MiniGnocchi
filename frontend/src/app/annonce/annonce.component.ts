import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "../services/token-storage.service";

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.scss']
})
export class AnnonceComponent implements OnInit {
  url = 'http://127.0.0.1:3000/annonceur/annonces/';
  annonces;

  constructor(private http: HttpClient, private token: TokenStorageService) {
  }

  ngOnInit(): void {
    this.http.get(this.url + JSON.parse(this.token.getUser()).id).subscribe(
      (data) => {
        this.annonces = data;
        console.log(data);
      },
      (error) => {
        console.log('Erreur ! : ' + error.message);
      }
    );
  }
}
