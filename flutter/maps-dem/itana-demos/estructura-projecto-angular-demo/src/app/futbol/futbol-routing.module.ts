import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmEquiposComponent } from './pages/adm-equipos/adm-equipos.component';
import { AdmJugadoresComponent } from './pages/adm-jugadores/adm-jugadores.component';

const routes: Routes = [
  {path: 'jugadores/adm', component: AdmJugadoresComponent },
  {path: 'equipos/adm', component: AdmEquiposComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FutbolRoutingModule { }
