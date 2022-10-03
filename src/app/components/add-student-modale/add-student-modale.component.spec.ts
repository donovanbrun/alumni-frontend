import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentModaleComponent } from './add-student-modale.component';

describe('AddStudentModaleComponent', () => {
  let component: AddStudentModaleComponent;
  let fixture: ComponentFixture<AddStudentModaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStudentModaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentModaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
