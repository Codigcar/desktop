import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseJugador } from '../models/response-jugador';
import { ResponseEquipo } from '../models/response-equipo';


@Injectable({
  providedIn: 'root'
})
export class FutbolService {

  readonly apiUrl: string = "https://v3.football.api-sports.io/";
  constructor(private http: HttpClient) { }

  getJugadores(): Observable<ResponseJugador> {
    const url = this.apiUrl + 'players?league=281&season=2021';
    return this.http.get<ResponseJugador>(url, {
      headers: new HttpHeaders().set("x-rapidapi-key", "key")
    });
  }

  getEquipos(): Observable<ResponseEquipo> {
    const url = this.apiUrl + 'teams?country=peru';
    return this.http.get<ResponseEquipo>(url, {
      headers: new HttpHeaders().set("x-rapidapi-key", "key")
    });
  }

}
