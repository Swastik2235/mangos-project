import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagingDetailComponent } from './packaging-detail.component';

describe('PackagingDetailComponent', () => {
  let component: PackagingDetailComponent;
  let fixture: ComponentFixture<PackagingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackagingDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
