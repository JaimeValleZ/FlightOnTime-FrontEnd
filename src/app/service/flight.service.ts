import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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


@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private readonly API_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  // 🚧 Por ahora NO dinámico
  getFlightDetailStatic(): Observable<FlightDetail> {
    return this.http.get<FlightDetail>(
      `${this.API_URL}/api/routes/vuelo/AV9781`
    );
  }

    // 🔮 Predicción estática por ahora
  getPredictionStatic(): Observable<PredictionResponse> {
    return this.http.post<PredictionResponse>(
      `${this.API_URL}/prediccion/predict-from-flight/AV9781`,
      null
    );
  }

}
