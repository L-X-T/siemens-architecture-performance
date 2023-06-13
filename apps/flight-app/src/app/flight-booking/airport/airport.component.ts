import { Component, inject } from '@angular/core';
import { AirportService } from '@flight-workspace/flight-lib';

@Component({
  selector: 'app-airport',
  templateUrl: './airport.component.html'
})
export class AirportComponent {
  // airports: string[] = [];
  readonly airports$ = inject(AirportService).findAll();
  /*private readonly airportsObserver: Observer<string[]> = {
    next: (airports) => (this.airports = airports),
    error: (err) => console.error(err),
    complete: () => console.log('Observable completed!')
  };

  // 1 subscription object
  private readonly subscription = new Subscription();

  // 2 takeUntil subject
  private readonly onDestroySubject = new Subject();
  readonly terminator$ = this.onDestroySubject.asObservable();

  constructor(private airportService: AirportService) {
    this.subscribeToAirports();
  }

  ngOnDestroy(): void {
    // 1 subscription object
    this.subscription.unsubscribe();

    // 2 takeUntil subject
    this.onDestroySubject.next(void 0);
    this.onDestroySubject.complete();
  }

  private subscribeToAirports(): void {
    // 1 subscription object
    this.subscription.add(this.airports$.subscribe(this.airportsObserver));
    // this.subscription.add(this.airports$.subscribe(this.airportsObserver)); // 2nd

    // 2 takeUntil subject
    this.airports$.pipe(takeUntil(this.terminator$)).subscribe(this.airportsObserver);
    // this.airports$.pipe(takeUntil(this.terminator$)).subscribe(this.airportsObserver); // 2nd
  }*/
}
