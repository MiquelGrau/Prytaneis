import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CityModel } from '../../core/models/city.model';

@Component({
  selector: 'app-selected-city',
  templateUrl: './selected-city.component.html',
  styleUrls: ['./selected-city.component.css']
})
export class SelectedCityComponent implements OnInit {
  loading$: Observable<boolean> = new Observable<boolean>();
  city$: Observable<CityModel | null> = new Observable<CityModel>();

  constructor(
    ) {
  }

  ngOnInit(): void {
  }

}
