import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzdavanjeRacunaUComponent } from './izdavanje-racuna-u.component';

describe('IzdavanjeRacunaUComponent', () => {
  let component: IzdavanjeRacunaUComponent;
  let fixture: ComponentFixture<IzdavanjeRacunaUComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IzdavanjeRacunaUComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IzdavanjeRacunaUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
