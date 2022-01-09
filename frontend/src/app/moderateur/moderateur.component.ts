import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenStorageService} from '../services/token-storage.service';
import {Router} from '@angular/router';
import {environment} from "../../environments/environment";

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
    this.http.get(environment.debutBackend + '/utilisateurs/').subscribe((data) => {
      this.utilisateurs = data;
    });
  }

  ban(id: string): void {
    this.http.patch(environment.debutBackend + '/moderateur/banUtilisateur/' + id, {id}, {responseType: 'text'}).subscribe((res) => {
      this.ngOnInit();
    }, error => console.log(error));
  }

  deban(id: string): void {
    this.http.patch(environment.debutBackend + '/moderateur/debanUtilisateur/' + id, {id}, {responseType: 'text'}).subscribe((res) => {
      this.ngOnInit();
    }, error => console.log(error));
  }

}
