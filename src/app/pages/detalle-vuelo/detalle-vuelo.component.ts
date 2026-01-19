import { Component, OnInit } from '@angular/core';
import { FlightDetail, FlightService, PredictionResponse } from '../../service/flight.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detalle-vuelo',
  templateUrl: './detalle-vuelo.component.html',
  styleUrl: './detalle-vuelo.component.css'
})
export class DetalleVueloComponent implements OnInit {

  flight!: FlightDetail;
  prediction!: PredictionResponse;
  loading = true;
  error = false;

  // ⏱️ Duración calculada para la vista
  duracionHoras = 0;
  duracionMinutos = 0;

  constructor(private flightService: FlightService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    const flightIata = this.route.snapshot.paramMap.get('flightIata');

    if (!flightIata) {
      this.error = true;
      this.loading = false;
      return;
    }

    this.flightService.getFlightDetailStatic(flightIata)
      .subscribe({
        next: (data) => {
          this.flight = data;

          // ⏱️ Duración
          this.duracionHoras = Math.floor(Number(this.flight.duracion) / 60);
          this.duracionMinutos = Number(this.flight.duracion) % 60;

          this.loadPrediction(flightIata);
        },
        error: () => {
          this.error = true;
          this.loading = false;
        }
      });
  }

  loadPrediction(flightIata: string): void {
    this.flightService.getPredictionStatic(flightIata)
      .subscribe({
        next: (data) => {
          this.prediction = data;
          this.loading = false;
        },
        error: () => {
          console.error('Error obteniendo predicción');
          this.loading = false;
        }
      });
  }

  goBack(): void {
  this.location.back();
}

}
