import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreduzeceRobeIUsluge1Component } from './preduzece-robe-iusluge1.component';

describe('PreduzeceRobeIUsluge1Component', () => {
  let component: PreduzeceRobeIUsluge1Component;
  let fixture: ComponentFixture<PreduzeceRobeIUsluge1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreduzeceRobeIUsluge1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreduzeceRobeIUsluge1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
