import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvalidMessageDirective } from './invalid-message.directive';

@NgModule({
  declarations: [
    InvalidMessageDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InvalidMessageDirective,
  ]
})
export class InvalidMessageModule { }
