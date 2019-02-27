import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDocumentComponent } from './add-document.component';
import { ReactiveFormsModule } from '@angular/forms';
import {CostMaskDirective} from '../../directives/mask-directives/cost-mask.directive';
import { MaskDirectivesModule } from '../../directives/mask-directives/mask-directives.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { ValidatorsModule } from '../../directives/validators/validators.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaskDirectivesModule,
    OwlNativeDateTimeModule,
    OwlDateTimeModule,
    ValidatorsModule,
    TranslateModule
  ],
  declarations: [
    AddDocumentComponent,
    CostMaskDirective,
  ],
  exports: [
    AddDocumentComponent
  ],
  providers: [
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'ru'},
  ],
})
export class AddDocumentModule { }
