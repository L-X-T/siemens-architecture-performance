/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Flight, FlightService } from '@flight-workspace/flight-lib';
import { Store } from '@ngrx/store';
import { FlightBookingAppState, flightBookingFeatureKey } from '../+state/flight-booking.reducer';
import { flightsLoaded } from '../+state/flight-booking.actions';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {
  from = 'Hamburg'; // in Germany
  to = 'Graz'; // in Austria
  urgent = false;
  // "shopping basket" with selected flights
  basket: { [id: number]: boolean } = {
    3: true,
    5: true
  };

  flights$ = this.store.select((appState) => appState[flightBookingFeatureKey].flights);

  constructor(private flightService: FlightService, private store: Store<FlightBookingAppState>) {}

  get flights(): Flight[] {
    return this.flightService.flights;
  }

  ngOnInit(): void {}

  search(): void {
    if (!this.from || !this.to) return;

    // this.flightService.load(this.from, this.to, this.urgent);

    this.flightService.find(this.from, this.to, this.urgent).subscribe({
      next: (flights) => {
        this.store.dispatch(flightsLoaded({ flights }));
      },
      error: (error) => {
        console.error('error', error);
      }
    });
  }

  delay(): void {
    this.flightService.delay();
  }
}
