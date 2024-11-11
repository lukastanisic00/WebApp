import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegistracijaKComponent } from './admin-registracija-k.component';

describe('AdminRegistracijaKComponent', () => {
  let component: AdminRegistracijaKComponent;
  let fixture: ComponentFixture<AdminRegistracijaKComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRegistracijaKComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRegistracijaKComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
