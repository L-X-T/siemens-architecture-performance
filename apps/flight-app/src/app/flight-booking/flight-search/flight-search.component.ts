/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { Flight, FlightService } from '@flight-workspace/flight-lib';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent {
  from = 'Hamburg'; // in Germany
  to = 'Graz'; // in Austria
  urgent = false;
  // "shopping basket" with selected flights
  basket: { [id: number]: boolean } = {
    3: true,
    5: true
  };

  flightsSignal = signal<Flight[]>([]);

  private readonly destroyRef = inject(DestroyRef);
  private readonly flightService = inject(FlightService);
  private readonly effectRef = effect(() => console.log(this.flightsSignal()));

  search(): void {
    if (!this.from || !this.to) {
      return;
    }

    this.flightService
      .find(this.from, this.to, this.urgent)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((flights) => this.flightsSignal.set(flights));
  }

  delay(): void {
    this.flightsSignal.update((flights) => {
      const date = new Date(flights[0].date);
      date.setTime(date.getTime() + 15 * 1000 * 60);
      const delayedFlight = { ...flights[0], date: date.toISOString() };
      return [delayedFlight, ...flights.slice(1)];
    });

    this.flightsSignal.mutate((flights) => {
      const date = new Date(flights[0].date);
      date.setTime(date.getTime() + 15 * 1000 * 60);
      flights[0] = { ...flights[0], date: date.toISOString() };
    });
  }
}
