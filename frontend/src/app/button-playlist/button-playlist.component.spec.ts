import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonPlaylistComponent } from './button-playlist.component';

describe('ButtonPlaylistComponent', () => {
  let component: ButtonPlaylistComponent;
  let fixture: ComponentFixture<ButtonPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonPlaylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
