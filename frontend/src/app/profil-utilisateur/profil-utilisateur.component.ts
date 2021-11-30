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
    mdp: null
  };
  form2: any = {
    mail: null
  };
  isMdpSuccessful = false;
  isMailSuccessful = false;
  errorMessage = '';
  isEditDone = false;
  areMdpDifferent: boolean;
  areMailDifferent: boolean;

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
        this.isMdpSuccessful = true;
      },
      err => {
        this.errorMessage = JSON.parse(err.error).message;

      });
  }

  checkMdp(): boolean {
    this.areMdpDifferent = this.form.mdp !== this.form.mdp2;
    console.log(this.areMdpDifferent);
    return this.areMdpDifferent;
  }

  onSubmitMail(): void {
    const {mail} = this.form2;
    console.log(mail);
    this.http.patch('http://localhost:3000/utilisateurs/modificationmail/' + JSON.parse(this.token.getUser()).id, {
      mail
    }, {responseType: 'text'}).subscribe(data => {
        this.isMailSuccessful = true;
      },
      err => {
        this.errorMessage = JSON.parse(err.error).message;
      });
  }

  checkMail(): boolean {
    this.areMailDifferent = this.form2.mail !== this.form2.mail;
    console.log(this.areMailDifferent);
    return this.areMailDifferent;
  }
}
