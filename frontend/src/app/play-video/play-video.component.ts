import {Component, Input, OnInit} from '@angular/core';
import {SafeResourceUrl} from "@angular/platform-browser";
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "../services/token-storage.service";

@Component({
  selector: 'app-play-video',
  templateUrl: './play-video.component.html',
  styleUrls: ['./play-video.component.scss']
})

export class PlayVideoComponent implements OnInit {
  @Input() urlSafe: SafeResourceUrl;
  @Input() title: string;
  @Input() id: string;
  @Input() miniature: string;

  constructor() {
  }


  ngOnInit(): void {

  }
}
