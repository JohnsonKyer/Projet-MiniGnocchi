import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenStorageService} from '../services/token-storage.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.scss']
})
export class AnnonceComponent implements OnInit {
  url = 'http://127.0.0.1:3000/annonceur/annonces/';
  urlNewAnnonce = 'http://127.0.0.1:3000/annonceur/ajoutAnnonce/';
  urlDelAnnonce = 'http://127.0.0.1:3000/annonceur/retraitAnnonce/';
  urlRenameAnnonce = 'http://127.0.0.1:3000/annonceur/renameAnnonce/';
  id: string;
  validatingForm: FormGroup;
  annonces;

  constructor(private http: HttpClient, private token: TokenStorageService, private router: Router) {
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
    this.validatingForm = new FormGroup({
      nameAnnonce: new FormControl('', Validators.required),
      newNameAnnonce: new FormControl('', Validators.required),
    });
  }

  annonce(id: string): void {
    this.router.navigate(['/annonce-detail'], {queryParams: {id}});
  }

  get nameAnnonce(): any {
    return this.validatingForm.get('nameAnnonce');
  }

  get newNameAnnonce(): any{
    return this.validatingForm.get('newNameAnnonce');
  }

  deleteAnnonce(id: string): void {
    this.http.patch(this.urlDelAnnonce + JSON.parse(this.token.getUser()).id, {id}, {responseType: 'text'}).subscribe(
      () => {
        this.ngOnInit();
      },
      error => {
        console.log(error);
      }
    );
    // this.http.delete(this.urlNewAnnonce + '/' + id, {responseType: 'text'})
    //   .subscribe(
    //     () => {
    //       this.ngOnInit();
    //     },
    //     (error) => {
    //       console.log('Erreur ! : ' + error);
    //     }
    //   );
  }

  setId(id: string): void {
    this.id = id;
  }

  renameAnnonce(): void {
    this.http.patch(this.urlRenameAnnonce + this.id, {titre: this.newNameAnnonce.value}, {responseType: 'text'})
      .subscribe(
        () => {
          this.ngOnInit();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }
}
