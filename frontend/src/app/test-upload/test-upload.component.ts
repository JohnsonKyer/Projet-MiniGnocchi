import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {UploadService} from '../services/upload.service';
import {HttpClient} from '@angular/common/http';
import {TokenStorageService} from '../services/token-storage.service';
import {error} from "protractor";

@Component({
  selector: 'app-test-upload',
  templateUrl: './test-upload.component.html',
  styleUrls: ['./test-upload.component.scss']
})
export class TestUploadComponent implements OnInit {
  selectedFiles?: FileList;
  message = '';
  imglink;
  form: any = {
    titre: null,
    image: null
  };
  file;
  fileInfos?: Observable<any>;
  private base64textString: string;

  constructor(private uploadService: UploadService, private http: HttpClient, private token: TokenStorageService) {
  }

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles) {
      const file: any | null = this.selectedFiles.item(0);
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.imglink = reader.result;
          // console.log(this.imglink)
        };
      }
    }
  }

  onSubmit(): any {
    if (this.selectedFiles) {
      this.file = this.selectedFiles.item(0);
    }
    this.upload().then(res => {
      this.http.patch('http://localhost:3000/annonceur/ajoutAnnonce/' + JSON.parse(this.token.getUser()).id, {
        annonce: {
          titre: this.form.titre,
          video: res.uploadedFile.link
        }
      }, {responseType: 'text'}).subscribe(r => {
        console.log(r);
      }, error1 => {
        console.log(error1.message);
      });
    }, reason => {
      console.log(reason);
    });
  }

  upload(): Promise<any> {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('uploadedImage', this.file);
      formData.append('titre', this.form.titre);
      this.http.post('http://localhost:3000/annonceur/uploadOnImgur', formData).subscribe(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  // const reader = new FileReader();
  // reader.onload = this._handleReaderLoaded.bind(this);
  // reader.readAsBinaryString(file);
  // console.log(this.base64textString);
  // if (reader.DONE) {
  //   this.http.post('http://127.0.0.1:3000/annonce/test', {image: this.base64textString}).subscribe(
  //     (r) => {
  //       console.log('success');
  //       console.log(r);
  //     },
  //     error => {
  //       console.log('error');
  //       console.log(error.message);
  //     }
  //   );
  // }

}
