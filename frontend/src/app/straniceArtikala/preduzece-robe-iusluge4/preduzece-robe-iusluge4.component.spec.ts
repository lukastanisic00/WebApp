import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreduzeceRobeIUsluge4Component } from './preduzece-robe-iusluge4.component';

describe('PreduzeceRobeIUsluge4Component', () => {
  let component: PreduzeceRobeIUsluge4Component;
  let fixture: ComponentFixture<PreduzeceRobeIUsluge4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreduzeceRobeIUsluge4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreduzeceRobeIUsluge4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
