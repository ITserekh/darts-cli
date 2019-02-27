import { Directive, Input, OnInit, ElementRef, Renderer2, QueryList, ContentChildren } from '@angular/core';
import { ValidatorsInterface } from '../../services/interfaces/validators-interface';
import { ControlContainer } from '@angular/forms';
import { ErrorMessageDirective } from './error-message.directive';
import { TranslateService } from '@ngx-translate/core';

@Directive({
  selector: '[appValidators]'
})
export class ValidatorsDirective implements OnInit {

  customValidatorsMessages: ValidatorsInterface;
  defaultValidatorsMessages: ValidatorsInterface = { validators: {}};

  @Input() set appValidators(customValidatorsMessages: ValidatorsInterface) {
    this.customValidatorsMessages = customValidatorsMessages;
  }

  @ContentChildren(ErrorMessageDirective) errorMessages: QueryList<ElementRef>;

  constructor(public formGroup: ControlContainer,
              private elementRef: ElementRef,
              private render: Renderer2,
              private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.translate.get('default-validators-massages').subscribe(validators => {
      this.defaultValidatorsMessages = validators;
    });
    this.formGroup.statusChanges.subscribe((status) => {
      if (status === 'INVALID') {
        this.setInvalid();
      }
    });
  }

  setInvalid() {
    // @ts-ignore
    const controlsNames = Object.keys(this.formGroup.control.controls);
    controlsNames.forEach( controlName => {
      // @ts-ignore
      const control = this.formGroup.form.controls[controlName];
      if (control.status === 'INVALID' && (control.dirty || control.touched)) {
        this.findError(controlName, control);
      } else if (control.status === 'VALID') {
        this.hideMessage(controlName);
      }
    });
  }

  findError(controlName: string, control: ControlContainer) {
    const errors = Object.keys(control.errors);
    let message: string;
    if (this.customValidatorsMessages) {
      errors.forEach(error => {
        if (control.errors[error]) {
          // вызвать отрисовку ошибки
          message = this.customValidatorsMessages.validators[controlName][error];
          this.showMessage(controlName, message);
        }
      });
    } else {
      errors.forEach(error => {
        console.log(this.defaultValidatorsMessages.validators);
        if (control.errors[error]) {
          // вызвать отрисовку ошибки
          message = this.defaultValidatorsMessages.validators[error];
          this.showMessage(controlName, message);
        }
      });
    }
  }

  showMessage(controlName: string, message: string) {
    const elementForMessage = this.errorMessages.find((element) => {
      // @ts-ignore
      if (controlName.indexOf(element.controlName) > - 1) {
        return true;
      }
      return false;
    });
    // @ts-ignore
    elementForMessage.elementRef.nativeElement.innerHTML = message;
  }

  hideMessage(controlName) {
    const elementForMessage = this.errorMessages.find((element) => {
      // @ts-ignore
      if (controlName.indexOf(element.controlName) > - 1) {
        return true;
      }
      return false;
    });
    // @ts-ignore
    elementForMessage.elementRef.nativeElement.innerHTML = '';
  }
}
