import { Component } from '@angular/core';
import { Router } from '@angular/router';


interface Airline {
  name: string;
  iata: string;
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
 search = '';

  airlines: Airline[] = [
    { name: 'Avianca', iata: 'AV' },
    { name: 'LATAM Airlines', iata: 'LA' },
    { name: 'AeroMéxico', iata: 'AM' },
    { name: 'American Airlines', iata: 'AA' },
    { name: 'Iberia', iata: 'IB' },
    { name: 'Emirates', iata: 'EK' }

  ];

  constructor(private router: Router) {}

  get filteredAirlines(): Airline[] {
    return this.airlines.filter(a =>
      a.name.toLowerCase().includes(this.search.toLowerCase()) ||
      a.iata.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  goToRoutes(iata: string) {
    // Más adelante esto llamará al endpoint:
    // /api/routes/{iata}/future
    this.router.navigate(['/aerolinea/rutas', iata]);
  }
}
