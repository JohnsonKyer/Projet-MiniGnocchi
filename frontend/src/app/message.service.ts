import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http:HttpClient) { }

  registerUser(user){
    user.grade = "utilisateur"
    this.http.post(environment.debutBackend + '/utilisateurs/inscription',user).subscribe(res =>{
      console.log("res = "+res)
    })
  }
  loginUser(user){
    user.grade = "utilisateur"
    this.http.post(environment.debutBackend + '/utilisateurs/connexion',user)
  }
}
