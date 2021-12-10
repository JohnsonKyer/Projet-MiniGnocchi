import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-form-change-mail',
  templateUrl: './form-change-mail.component.html',
  styleUrls: ['./form-change-mail.component.scss']
})
export class FormChangeMailComponent implements OnInit {


  form2: any = {
    mail: null
  };
  isMdpSuccessful ;
  isMailSuccessful ;
  errorMessage = '';
  isEditDone = false;
  areMdpDifferent;
  areMailDifferent;

  constructor(private http: HttpClient, private token: TokenStorageService) { }

  ngOnInit(): void {
  }
  onSubmitMail(): void {
    const {mail} = this.form2;
    console.log(mail);
    this.http.patch('http://127.0.0.1:3000/utilisateurs/modificationmail/' + JSON.parse(this.token.getUser()).id, {
      mail
    }, {responseType: 'text'}).subscribe(data => {
        this.isMailSuccessful = true;
      },
      err => {
        this.errorMessage = JSON.parse(err.error).message;
        this.isMailSuccessful = false;
      });
  }

  checkMail(): boolean {
    this.areMailDifferent = this.form2.mail !== this.form2.mail2;
    console.log(this.areMailDifferent);
    return this.areMailDifferent;
  }
}
