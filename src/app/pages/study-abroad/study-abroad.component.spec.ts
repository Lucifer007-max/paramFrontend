import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyAbroadComponent } from './study-abroad.component';

describe('StudyAbroadComponent', () => {
  let component: StudyAbroadComponent;
  let fixture: ComponentFixture<StudyAbroadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudyAbroadComponent]
    });
    fixture = TestBed.createComponent(StudyAbroadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
