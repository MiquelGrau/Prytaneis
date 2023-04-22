// goods-array.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { GoodsModel } from '../../core/models/inventory.model';

@Pipe({
  name: 'goodsArray'
})
export class GoodsArrayPipe implements PipeTransform {
  transform(value: Partial<GoodsModel> | undefined): { key: string, value: number }[] {
    if (!value) {
      return [];
    }

    return Object.entries(value)
      .map(([key, value]) => ({ key, value }))
      .filter(({ value }) => value !== undefined && value !== null) as { key: string, value: number }[];
  }
}
