import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:3000/utilisateurs/';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(mail: string, mdp: string): Observable<any> {
    return this.http.post(AUTH_API + 'connexion', {
      mail,
      mdp
    }, {responseType: 'text'});
  }

  register(mail: string, mdp: string, genre: string,  date: Date): Observable<any> {
    return this.http.post(AUTH_API + 'inscription', {
      mail,
      mdp,
      genre,
      date,
      grade:"utilisateur"
    }, {responseType: 'text'});
  }
}