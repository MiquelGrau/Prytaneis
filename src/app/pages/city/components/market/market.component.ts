import { Component, Input, OnInit } from '@angular/core';
import { BuildingModel, MarketModel } from '../../../../core/models/building.model';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {
  @Input() building!: BuildingModel;
  market!: MarketModel;

  ngOnInit(): void {
    this.market = this.building as MarketModel;
  }
}
