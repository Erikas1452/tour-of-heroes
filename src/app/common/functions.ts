import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function hasDuplicates(array: string[]) {
  var valuesSoFar = Object.create(null);
  for (var i = 0; i < array.length; ++i) {
    var value = array[i];
    if (value in valuesSoFar) {
      return true;
    }
    valuesSoFar[value] = true;
  }
  return false;
}

export function matchValidator(source: string, target: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const sourceCtrl = control.get(source);
    const targetCtrl = control.get(target);
    console.log("VALIDATING");
    console.log(sourceCtrl);
    console.log(targetCtrl);
    return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
      ? { mismatch: true }
      : null;
  };
}

export function identicalHashValidator(array: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = hasDuplicates(array);
    if (forbidden) {
      return { valuesDoMatch: true };
    } else return null;
  };
}
