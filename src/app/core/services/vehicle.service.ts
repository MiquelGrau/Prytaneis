import { Injectable } from '@angular/core';
import { VehicleModel } from '../models/vehicle.model';
import { CityModel, CurrentVehicleCityModel } from '../models/city.model';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) {}

  public getVehicles(): Observable<any> {
    return this.http.get(environment.api_url + '/vehicles');
  }

  public moveVehicleToCity(vehicle: VehicleModel, city: CityModel): void {
    if (vehicle.currentCity === null || vehicle.currentCity.id !== city.id) {
      if (vehicle.canMove(city.locationType)) {
        vehicle.currentCity = new CurrentVehicleCityModel(city.name, city.id);
        vehicle.position = city.position;
        console.log(`${vehicle.name} moved to ${city.name}`);
        return;
      }
      console.log(`${vehicle.name} cannot move to ${city.name} due to movement restrictions.`);
      return;
    }
    console.log(`${vehicle.name} is already in ${city.name}.`);
  }
}
