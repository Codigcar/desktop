import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaJugadoresComponent } from './tabla-jugadores.component';

describe('TablaJugadoresComponent', () => {
  let component: TablaJugadoresComponent;
  let fixture: ComponentFixture<TablaJugadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaJugadoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaJugadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
