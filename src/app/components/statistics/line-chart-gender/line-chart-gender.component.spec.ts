import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartGenderComponent } from './line-chart-gender.component';

describe('LineChartGenderComponent', () => {
  let component: LineChartGenderComponent;
  let fixture: ComponentFixture<LineChartGenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineChartGenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineChartGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
