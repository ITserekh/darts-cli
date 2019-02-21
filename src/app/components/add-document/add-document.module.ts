import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDocumentComponent } from './add-document.component';
import { ReactiveFormsModule } from '@angular/forms';
import {CostMaskDirective} from '../../directives/mask-directives/cost-mask.directive';
// import {NgxMaskModule} from 'ngx-mask';
import { MaskDirectivesModule } from '../../directives/mask-directives/mask-directives.module';

@NgModule({
  declarations: [
    AddDocumentComponent,
    CostMaskDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // NgxMaskModule.forRoot()
    MaskDirectivesModule
  ],
  exports: [
    AddDocumentComponent
  ]
})
export class AddDocumentModule { }
