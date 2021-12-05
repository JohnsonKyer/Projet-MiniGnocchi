import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchVideoPlaylistComponent } from './watch-video-playlist.component';

describe('WatchVideoPlaylistComponent', () => {
  let component: WatchVideoPlaylistComponent;
  let fixture: ComponentFixture<WatchVideoPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchVideoPlaylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchVideoPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
