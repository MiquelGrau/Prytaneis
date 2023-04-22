// market.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { BuildingModel, MarketModel } from '../../../../core/models/building.model';
import { GoodsModel } from '../../../../core/models/inventory.model';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { marketFeature, MarketState } from '../../../../shared/store/market/market.reducer';
import { loadMarketGoods } from '../../../../shared/store/market/market.actions';
import { getGoods } from '../../../../shared/store/market/market.selector';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {
  @Input() building!: BuildingModel;
  market!: MarketModel;
  goods$!: Observable<Partial<GoodsModel | null>>;

  constructor(
    private store: Store<{ [marketFeature]: MarketState }>
  ) {
  }

  ngOnInit(): void {
    this.market = this.building as MarketModel;
    this.store.dispatch(loadMarketGoods({ marketId: this.market.id }));
    this.goods$ = this.store.select(getGoods);
  }
}
