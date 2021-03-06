import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {UploadService} from '../services/upload.service';
import {HttpClient} from '@angular/common/http';
import {TokenStorageService} from '../services/token-storage.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {environment} from '../../environments/environment';


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
    image: null,
    tags: null
  };
  file;
  fileInfos?: Observable<any>;
  private base64textString: string;
  successfullyUploaded: boolean;
  uploading: boolean;
  // dropdownList = [];
  // selectedItems = [];
  // dropdownSettings: IDropdownSettings;

  constructor(private uploadService: UploadService, private http: HttpClient, private token: TokenStorageService,
              private flashMessage: FlashMessagesService) {
  }

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
    // Initialisation du dropdown tags
    // this.dropdownList = [
    //   {item_id: 1, item_text: 'Sport'},
    //   {item_id: 2, item_text: 'Jeu'},
    //   {item_id: 3, item_text: 'Education'},
    //   {item_id: 4, item_text: 'Actualité'},
    //   {item_id: 5, item_text: 'Histoire'}
    // ];
    // this.selectedItems = [
    //   {item_id: 3, item_text: 'Pune'},
    //   {item_id: 4, item_text: 'Navsari'}
    // ];
    // this.dropdownSettings = {
    //   singleSelection: false,
    //   idField: 'item_id',
    //   textField: 'item_text',
    //   selectAllText: 'Select All',
    //   unSelectAllText: 'UnSelect All',
    //   itemsShowLimit: 3,
    //   allowSearchFilter: true
    // };
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
      this.http.patch(environment.debutBackend + '/annonceur/ajoutAnnonce/' + JSON.parse(this.token.getUser()).id, {
        annonce: {
          titre: this.form.titre,
          video: res.uploadedFile.link,
          tags: this.form.tags
        }
      }, {responseType: 'text'}).subscribe(r => {
        console.log(r);
        this.flashMessage.show('L\'annonce a bien été publiée. Vous pouvez la visualiser dès maintenant dans vos annonces', {
          cssClass: 'alert-success p-2',
          timeout: 7000
        });
        this.form.titre = '';
        this.form.image = '';
        this.imglink = '';
        this.successfullyUploaded = true;
        this.uploading = false;
      }, error1 => {
        console.log(error1.message);
      });
    }, reason => {
      console.log(reason);
    });
  }

  upload(): Promise<any> {
    this.uploading = true;
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('uploadedImage', this.file);
      formData.append('titre', this.form.titre);
      this.http.post(environment.debutBackend + '/annonceur/uploadOnImgur', formData).subscribe(
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
