import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

@Directive({
  selector: '[validarData]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: DateValidatorDirective,
      multi: true,
    },
  ],
})
export class DateValidatorDirective implements Validator {
  @Input('valor') valor: string = '';

  constructor() {}

  validate(control: AbstractControl): ValidationErrors | null {
    return dateValidator()(control);
  }
}

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const dateValue = control.value;
    if (!dateValue) {
      return null; // Se o campo estiver vazio, isso será tratado pelo "required"
    }

    const date = new Date(dateValue);

    if (isNaN(date.getTime())) {
      return { dataInvalida: true }; // Data inválida
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Zerar horas para garantir a comparação correta

    // Definir um limite mínimo para a data (por exemplo, 1 de janeiro de 1900)
    const minDate = new Date('1900-01-01');
    if (date < minDate) {
      return { dataMuitoAntiga: true }; // A data é muito antiga
    }

    if (date > today) {
      return { dataFutura: true }; // A data não pode estar no futuro
    }

    return null; // Data válida
  };
}
