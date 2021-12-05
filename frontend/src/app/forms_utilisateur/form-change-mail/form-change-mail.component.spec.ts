import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormChangeMailComponent } from './form-change-mail.component';

describe('FormChangeMailComponent', () => {
  let component: FormChangeMailComponent;
  let fixture: ComponentFixture<FormChangeMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormChangeMailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormChangeMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
