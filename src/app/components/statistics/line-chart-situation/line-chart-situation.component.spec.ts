import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartSituationComponent } from './line-chart-situation.component';

describe('LineChartSituationComponent', () => {
  let component: LineChartSituationComponent;
  let fixture: ComponentFixture<LineChartSituationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineChartSituationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineChartSituationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
