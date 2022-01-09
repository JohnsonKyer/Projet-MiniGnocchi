import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-form-change-mdp',
  templateUrl: './form-change-mdp.component.html',
  styleUrls: ['./form-change-mdp.component.scss']
})
export class FormChangeMdpComponent implements OnInit {
  form: any = {
    mdp: null
  };
  isMdpSuccessful;
  isMailSuccessful;
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
    this.http.patch(environment.debutBackend + '/utilisateurs/modificationmdp/' + JSON.parse(this.token.getUser()).id, {
      mdp
    }, {responseType: 'text'}).subscribe(data => {
        this.isMdpSuccessful = true;
      },
      err => {
        this.errorMessage = JSON.parse(err.error).message;
        this.isMdpSuccessful = false;
      });
  }

  checkMdp(): boolean {
    this.areMdpDifferent = this.form.mdp !== this.form.mdp2;
    console.log(this.areMdpDifferent);
    return this.areMdpDifferent;
  }
}
