import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalvaJobCardFormComponent } from './galva-job-card-form.component';

describe('GalvaJobCardFormComponent', () => {
  let component: GalvaJobCardFormComponent;
  let fixture: ComponentFixture<GalvaJobCardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalvaJobCardFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalvaJobCardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
