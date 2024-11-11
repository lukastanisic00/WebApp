import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreduzeceNaruciociComponent } from './preduzece-narucioci.component';

describe('PreduzeceNaruciociComponent', () => {
  let component: PreduzeceNaruciociComponent;
  let fixture: ComponentFixture<PreduzeceNaruciociComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreduzeceNaruciociComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreduzeceNaruciociComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
