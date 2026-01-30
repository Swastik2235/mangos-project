import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalvaJobCardDetailComponent } from './galva-job-card-detail.component';

describe('GalvaJobCardDetailComponent', () => {
  let component: GalvaJobCardDetailComponent;
  let fixture: ComponentFixture<GalvaJobCardDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalvaJobCardDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalvaJobCardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
