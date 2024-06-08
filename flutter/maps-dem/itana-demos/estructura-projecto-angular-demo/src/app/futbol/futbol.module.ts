import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FutbolRoutingModule } from './futbol-routing.module';
import { MatTableModule } from '@angular/material/table';
import { AdmJugadoresComponent } from './pages/adm-jugadores/adm-jugadores.component';
import { AdmEquiposComponent } from './pages/adm-equipos/adm-equipos.component';
import { ViewJugadorComponent } from './pages/view-jugador/view-jugador.component';
import { ViewEquipoComponent } from './pages/view-equipo/view-equipo.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { TablaJugadoresComponent } from './components/tabla-jugadores/tabla-jugadores.component';


@NgModule({
  declarations: [
    AdmJugadoresComponent, AdmEquiposComponent, ViewJugadorComponent, ViewEquipoComponent, TablaJugadoresComponent
  ],
  imports: [
    CommonModule,
    FutbolRoutingModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class FutbolModule { }
