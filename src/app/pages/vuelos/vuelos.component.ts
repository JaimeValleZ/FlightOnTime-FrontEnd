import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlightService } from '../../service/vuelos.service';
import { FlightRoute } from './vuelos-route.model';
import { FlightStats } from './vuelos-stats.model';
@Component({
  selector: 'app-vuelos',
  templateUrl: './vuelos.component.html',
  styleUrls: ['./vuelos.component.css']
})
export class VuelosComponent implements OnInit {
  Math = Math; // para usar en el template

  // datos de vuelos
  airline!: string;
  flights: FlightRoute[] = [];
  stats: FlightStats = {
    totalVuelos: 0,
    vuelosPuntuales: 0,
    vuelosRetrasados: 0,
    porcentajePuntual: 0,
    porcentajeRetrasado: 0
  };
  totalFlights = 0;

  //paginación
  currentPage = 1;
  pageSize = 5;

  constructor(
    private route: ActivatedRoute,
    private flightService: FlightService
  ) {}

  ngOnInit(): void {
    this.airline = this.route.snapshot.paramMap.get('airline')!;
    this.loadFlights();
    this.loadStats();
  }

  loadStats(): void {
  this.flightService.getFlihtStatsByAirline(this.airline).subscribe({
    next: (data) => {
      this.stats = data;
    },
    error: (err) => {
      console.error('Error cargando estadísticas', err);
    }
  });
}
  loadFlights(): void {
    this.flightService.getRoutesByAirline(this.airline).subscribe({
      next: (data) => {
        this.flights = data;
        this.totalFlights = data.length;
      },
      error: (err) => {
        console.error('Error cargando vuelos', err);
      }
    });
  }

  //vuelos visibles por página
  get paginatedFlights(): FlightRoute[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.flights.slice(start, start + this.pageSize);
  }

  totalPages(): number {
    return Math.ceil(this.totalFlights / this.pageSize);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToPrediction(flight: FlightRoute): void {
    console.log('Predicción para:', flight.vuelo);
  }
}
