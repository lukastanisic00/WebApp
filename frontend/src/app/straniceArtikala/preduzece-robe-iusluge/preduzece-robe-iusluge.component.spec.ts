import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreduzeceRobeIUslugeComponent } from './preduzece-robe-iusluge.component';

describe('PreduzeceRobeIUslugeComponent', () => {
  let component: PreduzeceRobeIUslugeComponent;
  let fixture: ComponentFixture<PreduzeceRobeIUslugeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreduzeceRobeIUslugeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreduzeceRobeIUslugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
