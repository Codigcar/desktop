import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { JugadorCompleto } from '../../models/jugador-completo';
import { ResponseJugador } from '../../models/response-jugador';
import { FutbolService } from '../../services/futbol.service';

@Component({
  selector: 'app-tabla-jugadores',
  templateUrl: './tabla-jugadores.component.html',
  styleUrls: ['./tabla-jugadores.component.css']
})
export class TablaJugadoresComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'age', 'nationality'];
  dataSource: MatTableDataSource<JugadorCompleto> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private futbolService: FutbolService
  ) { }

  ngOnInit(): void {
    this.getJugadores();
  }

  getJugadores(): void {
    this.futbolService.getJugadores().subscribe(
      response => {
        let responseJugador: ResponseJugador = response;
        this.dataSource = new MatTableDataSource(responseJugador.response);
        this.dataSource.paginator = this.paginator!;

      }, err => {
        alert(err);
      }
    )
  }
}
