import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenStorageService} from '../services/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-moderateur',
  templateUrl: './moderateur.component.html',
  styleUrls: ['./moderateur.component.scss']
})
export class ModerateurComponent implements OnInit {

  utilisateurs: any;

  constructor(private http: HttpClient, private token: TokenStorageService, private router: Router) {
  }

  ngOnInit(): void {
    this.http.get('http://127.0.0.1:3000/utilisateurs/').subscribe((data) => {
      this.utilisateurs = data;
    });
  }

  ban(id: string): void {
    this.http.patch('http://127.0.0.1:3000/moderateur/banUtilisateur/' + id, {id}).subscribe((res) => {
      this.ngOnInit();
    }, error => console.log(error));
  }

  deban(id: string): void {
    this.http.patch('http://127.0.0.1:3000/moderateur/debanUtilisateur/' + id, {id}).subscribe((res) => {
      this.ngOnInit();
    }, error => console.log(error));;
  }

}
