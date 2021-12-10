import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http:HttpClient) { }

  registerUser(user){
    user.grade = "utilisateur"
    this.http.post('http://127.0.0.1:3000/utilisateurs/inscription',user).subscribe(res =>{
      console.log("res = "+res)
    })
  }
  loginUser(user){
    user.grade = "utilisateur"
    this.http.post('http://127.0.0.1:3000/utilisateurs/connexion',user)
  }
}
