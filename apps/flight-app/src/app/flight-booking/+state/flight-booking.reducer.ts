import { createReducer, on } from '@ngrx/store';
import * as FlightBookingActions from './flight-booking.actions';
import { Flight } from '@flight-workspace/flight-lib';

export const flightBookingFeatureKey = 'flightBooking';

export interface FlightBookingAppState {
  [flightBookingFeatureKey]: State;
}

export interface State {
  flights: Flight[];
  negativeList: number[];
  isLoadingFlights: boolean;
  loadingFlightsError: string;
}

export const initialState: State = {
  flights: [],
  negativeList: [3],
  isLoadingFlights: false,
  loadingFlightsError: ''
};

export const reducer = createReducer(
  initialState,

  on(FlightBookingActions.loadFlights, (state, a): State => {
    return { ...state, flights: [], isLoadingFlights: true, loadingFlightsError: '' };
  }),

  on(FlightBookingActions.loadFlightsError, (state, { err }): State => {
    return { ...state, isLoadingFlights: false, loadingFlightsError: err.message };
  }),

  on(FlightBookingActions.loadFlightsSuccess, (state, { flights }): State => {
    const isLoadingFlights = false;
    return { ...state, flights, isLoadingFlights };
  }),

  on(FlightBookingActions.updateFlight, (state, { flight }): State => {
    const flights = state.flights.map((f) => (f.id === flight.id ? flight : f));
    return { ...state, flights };
  })
);
