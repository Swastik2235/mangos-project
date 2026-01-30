import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportBomFormComponent } from './import-bom-form.component';

describe('ImportBomFormComponent', () => {
  let component: ImportBomFormComponent;
  let fixture: ComponentFixture<ImportBomFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportBomFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportBomFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
