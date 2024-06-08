import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmJugadoresComponent } from './adm-jugadores.component';

describe('AdmJugadoresComponent', () => {
  let component: AdmJugadoresComponent;
  let fixture: ComponentFixture<AdmJugadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmJugadoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmJugadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
