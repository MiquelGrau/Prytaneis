import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Observable, tap } from 'rxjs';
import { CityModel } from '../../core/models/city.model';
import { CitiesStateT, selectCities, selectLoading } from '../../shared/store/cities/cities.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.css']
})
export class WorldMapComponent implements OnInit {
  loading$: Observable<boolean> = new Observable<boolean>();
  citiesList$: Observable<CityModel[]> = new Observable<CityModel[]>();

  constructor(
    private store: Store<CitiesStateT>
  ) {}

  ngOnInit(): void {
    this.loading$ = this.store.select(selectLoading).pipe(
      map(res => {
        console.log('loading =', res);
        return res;
      })
    );
    this.citiesList$ = this.store.select(selectCities).pipe(
      map(res => {
        console.log('citiesList =', res);
        return res;
      })
    );
  }

}
