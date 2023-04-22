import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { cityFeature, CityState } from '../../shared/store/city/city.reducer';
import { CityModel } from '../../core/models/city.model';
import { getCity } from '../../shared/store/city/city.selectors';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent {
  city$: Observable<CityModel | null>;
  selectedBuildingId = 'B00003';

  constructor(
    private store: Store<{ [cityFeature]: CityState }>
  ) {
    this.city$ = this.store.select(getCity);
  }

  ngOnInit(): void {}
}
