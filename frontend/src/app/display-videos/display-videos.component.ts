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
  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  watch(id: string, title:string){
    this.video = {
      title: title,
      id : id
    };
    this.newItemEvent.emit(this.video);
  }
}
