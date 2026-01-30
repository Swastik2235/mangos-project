import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalvaMaterialComponent } from './galva-material.component';

describe('GalvaMaterialComponent', () => {
  let component: GalvaMaterialComponent;
  let fixture: ComponentFixture<GalvaMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalvaMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalvaMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
