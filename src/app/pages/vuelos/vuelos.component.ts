import { Component, OnInit } from '@angular/core';
import { FlightRoute, FlightService, FlightStats } from '../../service/flight.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertUtil } from '../../utils/alert.util';
import { Location } from '@angular/common';

@Component({
  selector: 'app-vuelos',
  templateUrl: './vuelos.component.html',
  styleUrl: './vuelos.component.css'
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

  // filtros
  searchText: string = '';
  filterOrigen: string = '';
  filterDestino: string = '';
  filterFecha: string = '';

  // listas para selects
  origenes: string[] = [];
  destinos: string[] = [];

  //carga
  isLoading = true;
  isError = false;


  constructor(
    private route: ActivatedRoute,
    private flightService: FlightService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.airline = this.route.snapshot.paramMap.get('airline')!;
    this.loadFlights();
    this.loadStats();
  }

  loadStats(): void {
    this.flightService.getFlightStatsByAirline(this.airline).subscribe({
      next: (data) => {
        this.stats = data;
      },
      error: (err) => {
        console.error('Error cargando estadísticas', err);
      }
    });
  }

  loadFlights(): void {
    this.isLoading = true;

    this.flightService.getRoutesByAirline(this.airline).subscribe({
      next: (data) => {
        this.flights = data;
        this.totalFlights = data.length;

        this.origenes = [...new Set(data.map(f => f.origenIata))];
        this.destinos = [...new Set(data.map(f => f.destinoIata))];

        this.isLoading = false; // 🔥 AQUÍ termina la carga real
      },
      error: (err) => {
        console.error('Error cargando vuelos', err);
        this.isLoading = false;
        this.isError = true;
      }
    });
  }


  get paginatedFlights(): FlightRoute[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredFlights.slice(start, start + this.pageSize);
  }


  totalPages(): number {
    return Math.ceil(this.filteredFlights.length / this.pageSize);
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

 goToDetalle(flightIata: string): void {
  this.router.navigate(['/vuelos/detalle', flightIata]);
}

  get porcentajePuntual(): number {
    return this.stats.totalVuelos > 0
      ? (this.stats.vuelosPuntuales * 100) / this.stats.totalVuelos
      : 0;
  }

  get porcentajeRetrasado(): number {
    return this.stats.totalVuelos > 0
      ? (this.stats.vuelosRetrasados * 100) / this.stats.totalVuelos
      : 0;
  }

  get filteredFlights(): FlightRoute[] {
    return this.flights.filter(flight => {

      // texto libre
      const textMatch =
        !this.searchText ||
        flight.vuelo.toLowerCase().includes(this.searchText.toLowerCase()) ||
        flight.origen.toLowerCase().includes(this.searchText.toLowerCase()) ||
        flight.destino.toLowerCase().includes(this.searchText.toLowerCase());

      // origen
      const origenMatch =
        !this.filterOrigen || flight.origenIata === this.filterOrigen;

      // destino
      const destinoMatch =
        !this.filterDestino || flight.destinoIata === this.filterDestino;

      // fecha (YYYY-MM-DD)
      const fechaMatch =
        !this.filterFecha || flight.fecha.startsWith(this.filterFecha);

      return textMatch && origenMatch && destinoMatch && fechaMatch;
    });
  }

  resetFilters(): void {
    this.searchText = '';
    this.filterOrigen = '';
    this.filterDestino = '';
    this.filterFecha = '';
    this.currentPage = 1;
  }

    goBack(): void {
  this.location.back();
}


}