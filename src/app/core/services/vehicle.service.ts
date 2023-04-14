import { Injectable } from '@angular/core';
import { VehicleModel } from '../models/vehicle.model';
import { CityModel, CurrentCityModel } from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  public moveVehicleToCity(vehicle: VehicleModel, city: CityModel): void {
    if (vehicle.currentCity === null || vehicle.currentCity.id !== city.id) {
      if (vehicle.canMove(city.locationType)) {
        vehicle.currentCity = new CurrentCityModel(city.name, city.id);
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
