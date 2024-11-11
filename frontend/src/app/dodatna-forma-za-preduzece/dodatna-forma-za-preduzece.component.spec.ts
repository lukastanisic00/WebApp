import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodatnaFormaZaPreduzeceComponent } from './dodatna-forma-za-preduzece.component';

describe('DodatnaFormaZaPreduzeceComponent', () => {
  let component: DodatnaFormaZaPreduzeceComponent;
  let fixture: ComponentFixture<DodatnaFormaZaPreduzeceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DodatnaFormaZaPreduzeceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DodatnaFormaZaPreduzeceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
