import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreduzeceRobeIUsluge3Component } from './preduzece-robe-iusluge3.component';

describe('PreduzeceRobeIUsluge3Component', () => {
  let component: PreduzeceRobeIUsluge3Component;
  let fixture: ComponentFixture<PreduzeceRobeIUsluge3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreduzeceRobeIUsluge3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreduzeceRobeIUsluge3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
