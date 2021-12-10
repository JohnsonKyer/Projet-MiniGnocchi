import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {UploadService} from '../services/upload.service';
import {HttpClient, HttpEventType, HttpResponse} from '@angular/common/http';
import {read} from '@popperjs/core';
import {TokenStorageService} from "../services/token-storage.service";

@Component({
  selector: 'app-test-upload',
  templateUrl: './test-upload.component.html',
  styleUrls: ['./test-upload.component.scss']
})
export class TestUploadComponent implements OnInit {
  title = 'Upload file';

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  imglink;
  titre;

  fileInfos?: Observable<any>;

  constructor(private uploadService: UploadService, private httpClient: HttpClient, private token: TokenStorageService) {
  }

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();

  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;
    if (this.selectedFiles) {
      const file: any | null = this.selectedFiles.item(0);
      if (file) {
        this.titre = (document.getElementById("text") as HTMLInputElement).value;

        console.log(file.name);
        this.currentFile = file;
        const reader = new FileReader();
        console.log(this.currentFile)
        // reader.readAsDataURL(this.currentFile);
        // reader.onload = (e) => {
        //   this.imglink = reader.result;
        //   console.log(this.imglink)
        //
        // };
        this.uploadService.upload(file).subscribe(r => {
          console.log("it works");
        }, error => {
          console.log(error)
        });
        // en attendant que imgur soit up
        // let id = 'EbhB21h'
        // this.httpClient.patch('http://localhost:3000/annonceur/ajoutAnnonce/' + JSON.parse(this.token.getUser()).id, {
        //   annonce: {
        //     titre: this.titre,
        //     video: id
        //   }
        // }, {responseType: 'text'})
        //   .subscribe(
        //     () => {
        //       console.log('ok');
        //     },
        //     error => {
        //       console.log(error);
        //     });
        // SEPARATION OLD 2 -------------------
        // this.uploadService.upload(this.currentFile).subscribe(
        //   (res: any) => {
        //     console.log(res.data.id);
        //     this.httpClient.patch('http://127.0.0.1:3000/annonceur/uploadAnnonce/' + JSON.parse(this.token.getUser()).id, {
        //       annonce: {
        //         titre: this.titre,
        //         video: res.data.id
        //       }
        //     }, {responseType: 'text'})
        //       .subscribe(
        //         () => {
        //           console.log('ok');
        //         },
        //         error => {
        //           console.log(error);
        //         });
        //   },
        //   (err: any) => {
        //     console.log(err);
        //     this.progress = 0;
        //
        //     if (err.error && err.error.message) {
        //       this.message = err.error.message;
        //     } else {
        //       this.message = 'Could not upload the file!';
        //     }
        //
        //     this.currentFile = undefined;
        //   });
      }

      this.selectedFiles = undefined;
    }
  }
}
