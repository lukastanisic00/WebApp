import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreduzeceRobeIUsluge2Component } from './preduzece-robe-iusluge2.component';

describe('PreduzeceRobeIUsluge2Component', () => {
  let component: PreduzeceRobeIUsluge2Component;
  let fixture: ComponentFixture<PreduzeceRobeIUsluge2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreduzeceRobeIUsluge2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreduzeceRobeIUsluge2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
