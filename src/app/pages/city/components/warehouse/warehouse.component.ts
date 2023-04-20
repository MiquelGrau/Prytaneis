import { Component, Input, OnInit } from '@angular/core';
import { BuildingModel, WarehouseModel } from '../../../../core/models/building.model';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {
  @Input() building!: BuildingModel;
  warehouse!: WarehouseModel;

  ngOnInit(): void {
    this.warehouse = this.building as WarehouseModel;
  }
}
