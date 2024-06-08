import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EquipoCompleto } from '../../models/equipo-completo';
import { ResponseEquipo } from '../../models/response-equipo';
import { FutbolService } from '../../services/futbol.service';

@Component({
  selector: 'app-adm-equipos',
  templateUrl: './adm-equipos.component.html',
  styleUrls: ['./adm-equipos.component.css']
})
export class AdmEquiposComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'country', 'founded'];
  dataSource: MatTableDataSource<EquipoCompleto> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private futbolService: FutbolService) { }

  ngOnInit(): void {
    this.getEquipos();
  }

  getEquipos(): void {
    this.futbolService.getEquipos().subscribe(
      response => {
        let responseEquipo: ResponseEquipo = response;
        this.dataSource = new MatTableDataSource(responseEquipo.response);
        this.dataSource.paginator = this.paginator!;
        console.log(this.dataSource.data);

      }, err => {
        alert(err);
      }
    )
  }
}
