import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartSituationComponent } from './pie-chart-situation.component';

describe('PieChartSituationComponent', () => {
  let component: PieChartSituationComponent;
  let fixture: ComponentFixture<PieChartSituationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieChartSituationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PieChartSituationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
