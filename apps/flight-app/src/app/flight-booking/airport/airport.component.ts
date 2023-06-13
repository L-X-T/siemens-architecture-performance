import { Component, inject, OnDestroy } from '@angular/core';
import { AirportService } from '@flight-workspace/flight-lib';
import { catchError, delay, Observer, of, share, Subject, Subscription, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-airport',
  templateUrl: './airport.component.html'
})
export class AirportComponent implements OnDestroy {
  readonly airports$ = inject(AirportService).findAll().pipe(delay(3000), share());

  protected airports: string[] = [];
  private readonly airportsObserver: Observer<string[]> = {
    next: (airports) => {
      this.airports = airports;
      this.airportsIsLoading = false;
      this.airportsTakeUntilIsLoading = false;
    },
    error: (err: HttpErrorResponse) => {
      console.error(err);
      this.airportsIsLoading = false;
      this.airportsErrorMessage = err.message;
      this.airportsTakeUntilIsLoading = false;
      this.airportsTakeUntilErrorMessage = err.message;
    },
    complete: () => console.log('Observable completed!')
  };

  // 1 subscription object
  private readonly subscription = new Subscription();
  airportsIsLoading = true;
  airportsErrorMessage = '';

  // 2 takeUntil subject
  private readonly onDestroySubject = new Subject();
  readonly terminator$ = this.onDestroySubject.asObservable();
  airportsTakeUntilIsLoading = true;
  airportsTakeUntilErrorMessage = '';

  // 3 async airports error handling
  readonly asyncAirports$ = this.airports$.pipe(
    catchError((err) => {
      this.asyncAirportsErrorMessage = err.message;
      return of([]);
    })
  );
  asyncAirportsErrorMessage = '';

  // 4 NG V16 takeUntilDestroyed()
  airports16: string[] = [];
  private readonly airportsDestroyed$ = inject(AirportService)
    .findAll()
    .pipe(takeUntilDestroyed())
    .subscribe((airports) => (this.airports16 = airports));

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
  }
}
