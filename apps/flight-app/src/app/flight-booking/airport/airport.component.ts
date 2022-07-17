import { Component } from '@angular/core';
import { AirportService } from '@flight-workspace/flight-lib';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-airport',
  templateUrl: './airport.component.html'
})
export class AirportComponent {
  airports: string[] = [];
  readonly airports$ = this.airportService.findAll();
  private readonly airportsObserver: Observer<string[]> = {
    next: (airports) => (this.airports = airports),
    error: (err) => console.error(err),
    complete: () => console.log('Observable completed!')
  };

  constructor(private airportService: AirportService) {
    this.subscribeToAirports();
  }

  private subscribeToAirports(): void {
    this.airports$.subscribe(this.airportsObserver);
  }
}
