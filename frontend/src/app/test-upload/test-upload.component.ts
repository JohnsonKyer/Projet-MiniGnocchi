import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {UploadService} from '../services/upload.service';
import {HttpClient, HttpEventType, HttpResponse} from '@angular/common/http';
import {read} from '@popperjs/core';
import {TokenStorageService} from '../services/token-storage.service';

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

  fileInfos?: Observable<any>;

  constructor(private uploadService: UploadService, private httpClient: HttpClient, private token: TokenStorageService) {
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
        };
      }
    }
  }

  upload(): void {
    if (this.selectedFiles) {
      const file: any | null = this.selectedFiles.item(0);
      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('titre', this.form.titre);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.uploadService.upload(formData);
        };
      }
      this.selectedFiles = undefined;
    }
  }
}
