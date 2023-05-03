import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { GoodsModel } from '../models/inventory.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private apiUrl = environment.api_url;

  constructor(private http: HttpClient) {}

  getCity(cityId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/cities/${cityId}`);
  }

  getMarketGoods(marketId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/markets/${marketId}/goods`);
  }

  purchaseGoods(marketId: string, goods: Partial<GoodsModel>): Observable<any> {
    const body = {
      buyerBuildingId : 'B00001',
      goods: goods
    }
    const url = `${this.apiUrl}/markets/${marketId}/transaction/buy`;
    return this.http.post(url, body);
  }

  updateWarehouseGoods(warehouseId: string, goods: Partial<GoodsModel>): Observable<any> {
    const url = `${this.apiUrl}/warehouse/${warehouseId}/update`;
    return this.http.post(url, goods);
  }
}
