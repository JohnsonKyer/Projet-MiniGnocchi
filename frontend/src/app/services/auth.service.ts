import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tokenize} from '@angular/compiler/src/ml_parser/lexer';
import {TokenStorageService} from './token-storage.service';
import {environment} from '../../environments/environment';

const AUTH_API = environment.debutBackend + '/utilisateurs/';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
  }

  register(mail: string, mdp: string, genre: string, date: Date, grade: string): Observable<any> {
    return this.http.post(AUTH_API + 'inscription', {
      mail,
      mdp,
      genre,
      date,
      grade
    }, {responseType: 'text'});
  }

  login(mail: string, mdp: string): Observable<any> {
    return this.http.post(AUTH_API + 'connexion', {
      mail,
      mdp
    }, {responseType: 'text'});
  }

  logout(): void{
    this.tokenStorage.signOut();
  }


}
