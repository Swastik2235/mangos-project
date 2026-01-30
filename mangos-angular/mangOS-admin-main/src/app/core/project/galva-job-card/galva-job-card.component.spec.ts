import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalvaJobCardComponent } from './galva-job-card.component';

describe('GalvaJobCardComponent', () => {
  let component: GalvaJobCardComponent;
  let fixture: ComponentFixture<GalvaJobCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalvaJobCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalvaJobCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
