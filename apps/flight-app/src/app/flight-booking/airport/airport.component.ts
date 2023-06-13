import { Component, OnDestroy, OnInit } from '@angular/core';
import { AirportService } from '@flight-workspace/flight-lib';
import { Observable, Observer, Subject, Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-airport',
  templateUrl: './airport.component.html'
})
export class AirportComponent implements OnDestroy {
  airports: string[] = [];
  readonly airports$ = this.airportService.findAll();
  private readonly airportsObserver: Observer<string[]> = {
    next: (airports) => (this.airports = airports),
    error: (err) => console.error(err),
    complete: () => console.log('Observable completed!')
  };

  // 1 subscription object
  private readonly subscription = new Subscription();

  constructor(private airportService: AirportService) {
    this.subscribeToAirports();
  }

  ngOnDestroy(): void {
    // 1 subscription object
    this.subscription.unsubscribe();
  }

  private subscribeToAirports(): void {
    // 1 subscription object
    this.subscription.add(this.airports$.subscribe(this.airportsObserver));
    // this.subscription.add(this.airports$.subscribe(this.airportsObserver)); // 2nd
  }
}
