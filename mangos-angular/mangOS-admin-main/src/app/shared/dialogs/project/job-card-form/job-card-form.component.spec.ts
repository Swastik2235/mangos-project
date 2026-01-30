import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCardFormComponent } from './job-card-form.component';

describe('JobCardFormComponent', () => {
  let component: JobCardFormComponent;
  let fixture: ComponentFixture<JobCardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobCardFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobCardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
