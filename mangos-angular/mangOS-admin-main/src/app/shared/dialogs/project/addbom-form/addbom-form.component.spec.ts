import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbomFormComponent } from './addbom-form.component';

describe('AddbomFormComponent', () => {
  let component: AddbomFormComponent;
  let fixture: ComponentFixture<AddbomFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddbomFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddbomFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
