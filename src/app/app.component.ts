import { Component, OnInit } from '@angular/core';
import { CityModel } from './core/models/city.model';
import { CoordsModel } from './core/models/coords.model';
import { LocationType } from './core/enums/location.type';
import { ShipModel, VehicleModel } from './core/models/vehicle.model';
import {VehicleService} from "./core/services/vehicle.service";
import {CityService} from "./core/services/city.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Prytaneis';
  cities: CityModel[] = [];
  vehicles: VehicleModel[] = [];

  constructor(
    private readonly vehicleService: VehicleService,
    private readonly cityService: CityService
  ) {}

  ngOnInit() {
    this.vehicleService.getVehicles().subscribe((res: any) => {
      this.vehicles = res.data.map((vehicle: any) => VehicleModel.fromJson(vehicle));
    });
    this.cityService.getCities().subscribe((res: any) => {
      this.cities = res.data.map((city: any) => CityModel.fromJson(city));
    });
  }

  createCity(): void {
    const name = prompt("Enter the name of the new city:");
    if (name && name.trim() !== "") {
      const position = CoordsModel.getRandomCoords();
      const locationType = LocationType.Sea;
      const city = new CityModel(name, position, locationType);
      this.cities.push(city);
      return;
    }
    alert("Enter a valid name");
  }

  createShip() {
    const name = prompt("Enter name for the new ship:");
    if (name && name.trim() !== "") {
      const position = CoordsModel.getRandomCoords();
      const newShip = new ShipModel(name, position);
      this.vehicles.push(newShip);
      return;
    }
    alert("Enter a valid name");
  }

}
