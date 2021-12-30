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
  annonce: {
    titre,
    video,
    tags,
    impressions,
    engagements,
    nbVideos
  };
  url = '';
  id;

  constructor(private http: HttpClient, private token: TokenStorageService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(r => {
      this.id = r.id;
    });
    this.http.get('http://127.0.0.1:3000/annonceur/annonce/' + this.id).subscribe(
      (r: any) => {
        this.annonce = {
          titre: r.titre,
          video: r.video,
          tags: r.tags,
          impressions: r.impressions,
          engagements: r.engagements,
          nbVideos: r.nbVideos
        };
        if (this.annonce.tags.length === 0) {
          this.annonce.tags[0] = 'Aucun tag';
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
