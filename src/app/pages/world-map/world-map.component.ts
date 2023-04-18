import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { WorldMapState, worldMapForFeature } from '../../shared/store/world-map/world-map.reducer';
import { Observable } from 'rxjs';
import { CityModel } from '../../core/models/city.model';

interface AppState extends WorldMapState {
  [worldMapForFeature]: WorldMapState;
}

@Component({
  selector: 'app-world-map-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.css']
})
export class WorldMapComponent implements OnInit {
  cities$: Observable<CityModel[]>;

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {
    this.cities$ = this.store.pipe(select(state => state[worldMapForFeature].cities));
  }

  ngOnInit(): void {}

  loadCity(id: string): void {
    this.router.navigate(['/city', id]);
  }
}
