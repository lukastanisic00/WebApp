import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreduzeceInfoComponent } from './preduzece-info.component';

describe('PreduzeceInfoComponent', () => {
  let component: PreduzeceInfoComponent;
  let fixture: ComponentFixture<PreduzeceInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreduzeceInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreduzeceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
