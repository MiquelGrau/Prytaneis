// market-goods.component.ts
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { GoodsModel } from '../../../../../core/models/inventory.model';
import { Store } from '@ngrx/store';
import { purchaseGoods } from '../../../../../shared/store/market/market.actions';
import { Subscription } from 'rxjs';
import { getPurchaseStatus, getLoadingGoods, getError } from '../../../../../shared/store/market/market.selector';
import { marketFeature, MarketState } from '../../../../../shared/store/market/market.reducer';

@Component({
  selector: 'app-market-goods',
  templateUrl: './market-goods.component.html',
  styleUrls: ['./market-goods.component.css']
})
export class MarketGoodsComponent implements OnInit, OnDestroy {
  @Input() goods!: Partial<GoodsModel>;
  @Input() marketId!: string;
  selectedGoods: { [key: string]: string } = {};
  purchaseStatus: string = '';
  loadingGoods: boolean = false;
  error: any;

  constructor(private store: Store<{ [marketFeature]: MarketState }>) {}

  ngOnInit(): void {
    this.store.select(getLoadingGoods).subscribe((loading) => {
      this.loadingGoods = loading;
    });

    this.store.select(getError).subscribe((error) => {
      this.error = error;
    });

    this.store.select(getPurchaseStatus).subscribe((status) => {
      this.purchaseStatus = status;
      if (status === 'success') {
        this.resetSelectedGoodsToZero();
      }
    });

    for (const key of Object.keys(this.goods)) {
      this.selectedGoods[key] = '0';
    }
  }

  ngOnDestroy(): void {
  }

  onPurchase(): void {
    const goods = {} as { [key: string]: number };
    for (const [key, value] of Object.entries(this.selectedGoods)) {
      goods[key] = parseInt(value, 10);
    }
    this.store.dispatch(purchaseGoods({ marketId: this.marketId, goods: { ...this.selectedGoods } }));
  }

  resetToZero(key: string, control: any): void {
    if (control.value === null || control.value === '') {
      this.selectedGoods[key] = '0';
    }
  }

  resetSelectedGoodsToZero(): void {
    for (const key of Object.keys(this.selectedGoods)) {
      this.selectedGoods[key] = '0';
    }
  }
}
