import {Component, Input, OnInit} from '@angular/core';
import {SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-play-video',
  templateUrl: './play-video.component.html',
  styleUrls: ['./play-video.component.scss']
})

export class PlayVideoComponent implements OnInit {
  @Input() urlSafe: SafeResourceUrl;
  @Input() title: string;

  constructor() {
  }

  ngOnInit(): void {
        }
}
