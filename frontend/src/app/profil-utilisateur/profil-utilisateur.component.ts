import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import {TokenStorageService} from '../services/token-storage.service';

@Component({
  selector: 'app-profil-utilisateur',
  templateUrl: './profil-utilisateur.component.html',
  styleUrls: ['./profil-utilisateur.component.scss']
})
export class ProfilUtilisateurComponent implements OnInit {
  form: any = {
    mdp: null,
    mail: null
  };
  isSuccessful = false;
  errorMessage = '';
  isEditDone = false;
  areDifferent: boolean;

  constructor(private http: HttpClient, private token: TokenStorageService) {
  }


  ngOnInit(): void {
  }

  onSubmitMdp(): void {
    const {mdp} = this.form;
    console.log(mdp);
    this.http.patch('http://localhost:3000/utilisateurs/modificationmdp/' + JSON.parse(this.token.getUser()).id, {
      mdp
    }, {responseType: 'text'}).subscribe(data => {
        this.isSuccessful = true;
      },
      err => {
        this.errorMessage = JSON.parse(err.error).message;

      });
  }

  checkMdp(): boolean {
    this.areDifferent = this.form.mdp !== this.form.mdp2;
    console.log(this.areDifferent);
    return this.areDifferent;
  }
}
