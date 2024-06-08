import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Jugador } from './futbol/models/jugador';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sports-app';
  panelOpenState = false;
  displayedColumns: string[] = ['id', 'name', 'age', 'nationality'];
  dataSource: MatTableDataSource<Jugador> = new MatTableDataSource();

  constructor(private router: Router,) { }
}
