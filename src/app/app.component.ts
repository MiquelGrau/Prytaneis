import { Component, OnInit } from '@angular/core';
import { CityModel } from './core/models/city.model';
import { CoordsModel } from './core/models/coords.model';
import { LocationType } from './core/enums/location.type';
import { CaravanModel, PersonModel, ShipModel, VehicleModel } from './core/models/vehicle.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Prytaneis';
  cities: CityModel[] = [
    new CityModel('New York', new CoordsModel(40.7128, -74.0060), LocationType.Land),
    new CityModel('Los Angeles', new CoordsModel(34.0522, -118.2437), LocationType.Both),
    new CityModel('San Francisco', new CoordsModel(37.7749, -122.4194), LocationType.Both),
  ];

  vehicles: VehicleModel[] = [
    new ShipModel('Titanic', new CoordsModel(41.7325, -49.9469)),
    new CaravanModel('Ford F-150', new CoordsModel(39.2904, -76.6122)),
    new PersonModel('John', new CoordsModel(42.3601, -71.0589))
  ];

  constructor() {}

  ngOnInit() {
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
