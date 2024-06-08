import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmEquiposComponent } from './adm-equipos.component';

describe('AdmEquiposComponent', () => {
  let component: AdmEquiposComponent;
  let fixture: ComponentFixture<AdmEquiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmEquiposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmEquiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
