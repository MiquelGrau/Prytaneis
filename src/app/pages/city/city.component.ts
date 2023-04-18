// city.component.ts

import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { cityForFeature, CityState } from '../../shared/store/city/city.reducer';
import { CityModel } from '../../core/models/city.model';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent {
  city$: Observable<CityModel | null>;

  constructor(
    private store: Store<{ [cityForFeature]: CityState }> // Update the type of the store to Store<{ [cityForFeature]: CityState }>
  ) {
    this.city$ = this.store.pipe(select(state => state[cityForFeature]?.city)); // Update the selector
  }

  ngOnInit(): void {}
}
