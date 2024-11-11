import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegistracijaPComponent } from './admin-registracija-p.component';

describe('AdminRegistracijaPComponent', () => {
  let component: AdminRegistracijaPComponent;
  let fixture: ComponentFixture<AdminRegistracijaPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRegistracijaPComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRegistracijaPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
