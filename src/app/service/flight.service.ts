import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

export interface WeatherDTO {
  temperature: number;
  precipitation: number;
  windSpeed: number;
  forecast: boolean;
}

export interface FlightDetail {
  aerolinea: string;
  aerolineaIata: string;
  vuelo: string;

  origen: string;
  origenIata: string;
  paisOrigen: string;
  ciudadOrigen: string;

  destino: string;
  destinoIata: string;
  paisDestino: string;
  ciudadDestino: string;

  horaSalida: string; // "2026-01-13 16:00"
  horaLlegada: string; // "2026-01-13 18:30"
  duracion: Number; // en minutos

  climaActual: WeatherDTO;
}

export interface PredictionResponse {
  prevision: string;
  probabilidad: number;
}

export interface FlightRoute {
  aerolinea: string;
  vuelo: string;
  origenIata: string;
  destinoIata: string;
  origen: string;
  destino: string;
  fecha: string;
  horaSalida: string;
  horaLlegada: string;
}

export interface FlightStats {
  totalVuelos: number;
  vuelosPuntuales: number;
  vuelosRetrasados: number;
  porcentajePuntual: number;
  porcentajeRetrasado: number;
}

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private readonly API_URL = 'http://localhost:8080';

  private routesCache = new Map<string, FlightRoute[]>();
  private statsCache = new Map<string, FlightStats>();

  constructor(private http: HttpClient) { }

  // 🚧 Por ahora NO dinámico
  getFlightDetailStatic(flightIata: string): Observable<FlightDetail> {
    return this.http.get<FlightDetail>(
      `${this.API_URL}/api/routes/vuelo/${flightIata}`
    );
  }

  // 🔮 Predicción 
  getPredictionStatic(flightIata: string): Observable<PredictionResponse> {
    return this.http.post<PredictionResponse>(
      `${this.API_URL}/prediccion/predict-from-flight/${flightIata}`,
      null
    );
  }

  getRoutesByAirline(airline: string): Observable<FlightRoute[]> {

    if (this.routesCache.has(airline)) {
      return of(this.routesCache.get(airline)!);
    }

    return this.http.get<FlightRoute[]>(
      `${this.API_URL}/api/routes/${airline}/future`
    ).pipe(
      tap(data => this.routesCache.set(airline, data))
    );
  }

getFlightStatsByAirline(airline: string): Observable<FlightStats> {
  return this.http.get<FlightStats>(
    `${this.API_URL}/vuelos/stats/${airline}`
  );
}

}
