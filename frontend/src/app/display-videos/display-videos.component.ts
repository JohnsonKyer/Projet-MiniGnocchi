import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-display-videos',
  templateUrl: './display-videos.component.html',
  styleUrls: ['./display-videos.component.scss']
})
export class DisplayVideosComponent implements OnInit {
  @Input() videos: any[] = [];
  @Output() newItemEvent = new EventEmitter<any>();
  video: any;
  constructor() {
  }

  ngOnInit(): void {
  }

  watch(id: string, title:string,miniature:string){
    this.video = {
      title: title,
      id : id,
      miniature : miniature,
    };
    this.newItemEvent.emit(this.video);
  }
}
