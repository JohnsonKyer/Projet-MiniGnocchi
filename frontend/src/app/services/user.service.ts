import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";

const API_URL = environment.debutBackend + '/api/test/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }


  getUtilisateurBoard(): Observable<any> {
    return this.http.get(API_URL + 'utilisateur', {responseType: 'text'});
  }

  getAnnonceurBoard(): Observable<any> {
    return this.http.get(API_URL + 'annonceur', {responseType: 'text'});
  }

  getModerateurBoard(): Observable<any> {
    return this.http.get(API_URL + 'moderateur', {responseType: 'text'});
  }
}
