import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPromenaLozinkeComponent } from './admin-promena-lozinke.component';

describe('AdminPromenaLozinkeComponent', () => {
  let component: AdminPromenaLozinkeComponent;
  let fixture: ComponentFixture<AdminPromenaLozinkeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPromenaLozinkeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPromenaLozinkeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
