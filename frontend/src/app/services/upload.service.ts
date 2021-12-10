import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorageService} from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private token: TokenStorageService) {
  }

  upload(file: FormData): void {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.imgur.com/3/image.json'); // Boooom!
    xhr.onload = () => {
      const link = JSON.parse(xhr.responseText).data.link;
      console.log(link);
    };
    xhr.setRequestHeader('Authorization', 'Client-ID 178ece219d86d47');
    xhr.send(file);
  }

  // const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*', Authorization: 'Client-ID 178ece219d86d47'});
  // return this.http.post('https://api.imgur.com/3/image', {image: file.get('image')}, {responseType: 'json', headers});


  getFiles()
    :
    Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }
}
