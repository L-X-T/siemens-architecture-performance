/* eslint-disable no-restricted-syntax */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  expertMode = false;
  needsLogin$: Observable<boolean> | undefined;

  constructor(private route: ActivatedRoute) {}

  _userName = '';

  get userName(): string {
    return this._userName;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  changed($event: any): void {
    console.debug('$event.detail ', $event.detail);

    this.expertMode = $event.detail;
  }

  ngOnInit(): void {
    this.needsLogin$ = this.route.params.pipe(map((params) => !!params['needsLogin']));
  }

  login(): void {
    this._userName = 'Login will be implemented in another exercise!';
  }

  logout(): void {
    this._userName = '';
  }
}
