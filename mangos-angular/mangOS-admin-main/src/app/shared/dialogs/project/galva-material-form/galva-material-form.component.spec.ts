import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalvaMaterialFormComponent } from './galva-material-form.component';

describe('GalvaMaterialFormComponent', () => {
  let component: GalvaMaterialFormComponent;
  let fixture: ComponentFixture<GalvaMaterialFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalvaMaterialFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalvaMaterialFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
