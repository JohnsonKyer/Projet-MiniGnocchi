import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { TokenStorageService } from './token-storage.service';

const AUTH_API = 'http://localhost:3000/utilisateurs/';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private tokenStorage:TokenStorageService) { }

  register(mail: string, mdp: string, genre: string,  date: Date): Observable<any> {
    return this.http.post(AUTH_API + 'inscription', {
      mail,
      mdp,
      genre,
      date,
      grade:"utilisateur"
    }, {responseType: 'text'});
  }

  login(mail: string, mdp: string): Observable<any> {
    return this.http.post(AUTH_API + 'connexion', {
      mail,
      mdp
    }, {responseType: 'text'});
  }
  
  logout(){
    this.tokenStorage.signOut();
  }





}