import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDocumentComponent } from './add-document.component';
import { ReactiveFormsModule } from '@angular/forms';
import {CostMaskDirective} from '../../directives/mask-directives/cost-mask.directive';
// import {NgxMaskModule} from 'ngx-mask';
import { MaskDirectivesModule } from '../../directives/mask-directives/mask-directives.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';

@NgModule({
  declarations: [
    AddDocumentComponent,
    CostMaskDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // NgxMaskModule.forRoot()
    MaskDirectivesModule,
    OwlNativeDateTimeModule,
    OwlDateTimeModule
  ],
  exports: [
    AddDocumentComponent
  ],
  providers: [
    // use french locale
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'ru'},
  ],
})
export class AddDocumentModule { }
