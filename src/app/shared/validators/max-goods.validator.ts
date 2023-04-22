import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function maxGoodsValidator(maxValue: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    return value > maxValue ? { maxGoods: { maxValue, actualValue: value } } : null;
  };
}
