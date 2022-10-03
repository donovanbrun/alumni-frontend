import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPromotionComponent } from './settings-promotion.component';

describe('SettingsPromotionComponent', () => {
  let component: SettingsPromotionComponent;
  let fixture: ComponentFixture<SettingsPromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsPromotionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
