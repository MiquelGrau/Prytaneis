// max-goods.directive.ts
import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { maxGoodsValidator } from '../../../../../shared/validators/max-goods.validator';

@Directive({
  selector: '[maxGoods]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MaxGoodsDirective,
      multi: true
    }
  ]
})
export class MaxGoodsDirective implements Validator {
  @Input() maxGoods!: number;

  validate(control: AbstractControl): ValidationErrors | null {
    return this.maxGoods ? maxGoodsValidator(this.maxGoods)(control) : null;
  }
}
