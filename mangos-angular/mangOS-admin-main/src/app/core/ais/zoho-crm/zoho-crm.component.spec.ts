import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZohoCrmComponent } from './zoho-crm.component';

describe('ZohoCrmComponent', () => {
  let component: ZohoCrmComponent;
  let fixture: ComponentFixture<ZohoCrmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZohoCrmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZohoCrmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});