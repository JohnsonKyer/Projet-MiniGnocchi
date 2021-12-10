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

  upload(formData: FormData): void {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.imgur.com/3/image.json');
    console.log(JSON.parse(this.token.getUser()).id)
    xhr.onload = () => {
      this.http.patch('http://127.0.0.1:3000/annonceur/ajoutAnnonce/' + JSON.parse(this.token.getUser()).id, {
          annonce: {
            titre: formData.get('titre'),
            video: JSON.parse(xhr.responseText).data.id
          }
        })
          .subscribe(
            (success) => {
              console.log('ok');
            },
            (error) => {
              console.log(error);
            });
    };
    xhr.setRequestHeader('Authorization', 'Client-ID 178ece219d86d47');
    xhr.send(formData);
  }

  // const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*', Authorization: 'Client-ID 178ece219d86d47'});
  // return this.http.post('https://api.imgur.com/3/image', {image: file.get('image')}, {responseType: 'json', headers});


  getFiles()
    :
    Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }
}
