import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDocumentComponent } from './add-document.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddDocumentComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    AddDocumentComponent
  ]
})
export class AddDocumentModule { }
