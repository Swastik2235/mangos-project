import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TankDataComponent } from './tank-data.component';

describe('TankDataComponent', () => {
  let component: TankDataComponent;
  let fixture: ComponentFixture<TankDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TankDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TankDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
