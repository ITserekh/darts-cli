import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidatorsDirective } from './validators.directive';
import { ErrorMessageDirective } from './error-message.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ValidatorsDirective,
    ErrorMessageDirective
  ],
  exports: [
    ValidatorsDirective,
    ErrorMessageDirective
  ]
})
export class ValidatorsModule { }
