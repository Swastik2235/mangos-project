import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TankDataFormComponent } from './tank-data-form.component';

describe('TankDataFormComponent', () => {
  let component: TankDataFormComponent;
  let fixture: ComponentFixture<TankDataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TankDataFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TankDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
