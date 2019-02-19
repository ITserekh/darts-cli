import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AddItemRoutingModule } from './add-item-routing.module';
import { AddItemComponent } from './add-item.component';

import { ShowTableComponent } from '../../components/show-table/show-table.component';
import { TableCellComponent } from '../../components/table-cell/table-cell.component';
import { TableBodyComponent } from '../../components/table-body/table-body.component';
import { PagingComponent } from '../../components/paging/paging.component';
import { BankTableComponent } from '../../components/bank-table/bank-table.component';

@NgModule({
  declarations: [
    AddItemComponent,
    ShowTableComponent,
    TableCellComponent,
    TableBodyComponent,
    PagingComponent,
    BankTableComponent
  ],
  imports: [
    CommonModule,
    AddItemRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AddItemModule { }
