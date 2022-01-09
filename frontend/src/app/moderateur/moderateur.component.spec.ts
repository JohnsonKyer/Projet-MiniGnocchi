import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModerateurComponent } from './moderateur.component';

describe('ModerateurComponent', () => {
  let component: ModerateurComponent;
  let fixture: ComponentFixture<ModerateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModerateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModerateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
