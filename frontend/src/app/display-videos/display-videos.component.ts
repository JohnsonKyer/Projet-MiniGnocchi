import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-display-videos',
  templateUrl: './display-videos.component.html',
  styleUrls: ['./display-videos.component.scss']
})
export class DisplayVideosComponent implements OnInit {
  videos: any[] = [];
  constructor() {
  }

  ngOnInit(): void {
  }

  addItem(newItem: any) {
    this.videos=[];
    for (let element in newItem) {
      this.videos.push({
        title: newItem[element].title,
        id: newItem[element].id,
        link: newItem[element].link,
        miniature: newItem[element].miniature,
      });
    }
  }
}
