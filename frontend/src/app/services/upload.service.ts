import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorageService} from "./token-storage.service";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private token: TokenStorageService) {
  }

  upload(file: File): Observable<any> {
    const headers = new HttpHeaders({Authorization: 'Client-ID 178ece219d86d47'});
    return this.http.post('https://api.imgur.com/3/image', {image: file}, {responseType: 'json', headers});
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }
}
