import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorageService} from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  baseUrl = 'http://localhost:3000';
  private base64textString: string;

  constructor(private http: HttpClient, private token: TokenStorageService) {
  }

  upload(file): void {
    // const reader = new FileReader();
    // reader.onload = this._handleReaderLoaded.bind(this);
    // reader.readAsBinaryString(file);
    // console.log(this.base64textString);
    // this.http.post('http://127.0.0.1:3000/annonce/test', {image: this.base64textString}).subscribe(
    //   (r) => {
    //     console.log(r);
    //   },
    //   error => {
    //     console.log(error.message);
    //   }
    // );
    //
    //
    //
    // const xhr = new XMLHttpRequest();
    // xhr.open('POST', 'https://api.imgur.com/3/image.json');
    // xhr.onload = () => {
    //   this.http.patch('http://127.0.0.1:3000/annonceur/ajoutAnnonce/' + JSON.parse(this.token.getUser()).id, {
    //       annonce: {
    //         titre: formData.get('titre'),
    //         video: JSON.parse(xhr.responseText).data.link
    //       }
    //     })
    //       .subscribe(
    //         (success) => {
    //           console.log('ok');
    //         },
    //         (error) => {
    //           console.log(error);
    //         });
    // };
    // xhr.setRequestHeader('Authorization', 'Client-ID 178ece219d86d47');
    // xhr.send(formData);
  }

  // const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*', Authorization: 'Client-ID 178ece219d86d47'});
  // return this.http.post('https://api.imgur.com/3/image', {image: file.get('image')}, {responseType: 'json', headers});

  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    console.log(btoa(binaryString));
  }

  getFiles()
    :
    Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }
}
