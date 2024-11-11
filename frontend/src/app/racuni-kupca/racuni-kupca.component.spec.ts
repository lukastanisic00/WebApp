import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RacuniKupcaComponent } from './racuni-kupca.component';

describe('RacuniKupcaComponent', () => {
  let component: RacuniKupcaComponent;
  let fixture: ComponentFixture<RacuniKupcaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RacuniKupcaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RacuniKupcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
