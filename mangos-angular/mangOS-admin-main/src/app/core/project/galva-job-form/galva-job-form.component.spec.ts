import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalvaJobFormComponent } from './galva-job-form.component';

describe('GalvaJobFormComponent', () => {
  let component: GalvaJobFormComponent;
  let fixture: ComponentFixture<GalvaJobFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalvaJobFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalvaJobFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
