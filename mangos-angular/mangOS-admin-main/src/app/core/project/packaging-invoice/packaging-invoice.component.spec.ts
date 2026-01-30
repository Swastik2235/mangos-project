import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagingInvoiceComponent } from './packaging-invoice.component';

describe('PackagingInvoiceComponent', () => {
  let component: PackagingInvoiceComponent;
  let fixture: ComponentFixture<PackagingInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackagingInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagingInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
