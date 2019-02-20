import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AddItemRoutingModule } from './add-item-routing.module';
import { AddItemComponent } from './add-item.component';

import { BankTableComponent } from '../../components/bank-table/bank-table.component';
import { CustomTableModule } from '../../custom-table.module';
import { AddDocumentModule } from '../../components/add-document/add-document.module';

@NgModule({
  declarations: [
    AddItemComponent,
    BankTableComponent
  ],
  imports: [
    CommonModule,
    AddItemRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CustomTableModule,
    AddDocumentModule
  ]
})
export class AddItemModule { }
