import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RasporedDijalogComponent } from './raspored-dijalog.component';

describe('RasporedDijalogComponent', () => {
  let component: RasporedDijalogComponent;
  let fixture: ComponentFixture<RasporedDijalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RasporedDijalogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RasporedDijalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
