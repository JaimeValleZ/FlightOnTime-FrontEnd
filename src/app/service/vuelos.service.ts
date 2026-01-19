import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FlightRoute } from '../pages/vuelos/vuelos-route.model';
import { FlightStats } from '../pages/vuelos/vuelos-stats.model';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private baseUrl = 'http://localhost:8081/api/routes/{airline}/future';
  private statsUrl = 'http://localhost:8081/vuelos/stats/{airline}';
  constructor(private http: HttpClient) {}

  getRoutesByAirline(airline: string): Observable<FlightRoute[]> {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJGbGlnHRPblRpbWUiLCJzdWIiOiJqYWltZUBnbWFpbC5jb20iLCJleHAiOjE3Njg4NDcwMTB9.P1oW2I2Uycu9wc2MgiIjSMAeRmpmMHmNaDg_HoL_-k4";
    //localStorage.getItem('token'); // preparado para JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<FlightRoute[]>(
      `${this.baseUrl.replace('{airline}', airline)}`,
      { headers }
    );
  }

  getFlihtStatsByAirline(airline: string): Observable<FlightStats> {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJc3MiOiJGbGlnaHRPblRpbWUiLCJzdWIiOiJqYWltZUBnbWFpbC5jb20iLCJleHAiOjE3Njg4NDcwMTB9.P1oW2I2Uycu9wc2MgiIjSMAeRmpmMHmNaDg_HoL_-k4";
    //localStorage.getItem('token'); // preparado para JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<FlightStats>(
      `${this.statsUrl.replace('{airline}', airline)}`,
      { headers }
    );
  }
}