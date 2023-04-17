import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    // this.vehicleService.getVehicles().subscribe((res: any) => {
    //   this.vehicles = res.data.map((vehicle: any) => VehicleModel.fromJson(vehicle));
    // });
  }

  // createCity(): void {
  //   const name = prompt("Enter the name of the new cities:");
  //   if (name && name.trim() !== "") {
  //     const position = CoordsModel.getRandomCoords();
  //     const locationType = LocationType.Sea;
  //     const city = new CityModel(name, position, locationType);
  //     this.cities.push(city);
  //     return;
  //   }
  //   alert("Enter a valid name");
  // }

  // createShip() {
  //   const name = prompt("Enter name for the new ship:");
  //   if (name && name.trim() !== "") {
  //     const position = CoordsModel.getRandomCoords();
  //     const newShip = new ShipModel(name, position);
  //     this.vehicles.push(newShip);
  //     return;
  //   }
  //   alert("Enter a valid name");
  // }

}
