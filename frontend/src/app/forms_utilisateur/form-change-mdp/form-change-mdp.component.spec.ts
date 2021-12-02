import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormChangeMdpComponent } from './form-change-mdp.component';

describe('FormChangeMdpComponent', () => {
  let component: FormChangeMdpComponent;
  let fixture: ComponentFixture<FormChangeMdpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormChangeMdpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormChangeMdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
