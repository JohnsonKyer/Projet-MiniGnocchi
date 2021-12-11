import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "../services/token-storage.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-annonce-detail',
  templateUrl: './annonce-detail.component.html',
  styleUrls: ['./annonce-detail.component.scss']
})
export class AnnonceDetailComponent implements OnInit {
  annonce;
  url = '';

  constructor(private http: HttpClient, private token: TokenStorageService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.http.patch('' + JSON.parse(this.token.getUser()).id, {id: this.route.snapshot.params.id}, {responseType: 'text'}).subscribe(
      () => {
        this.ngOnInit();
      },
      error => {
        console.log(error);
      }
    );
  }

}
