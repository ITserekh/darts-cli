import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowTableComponent } from './components/show-table/show-table.component';
import { TableCellComponent } from './components/table-cell/table-cell.component';
import { TableBodyComponent } from './components/table-body/table-body.component';
import { PagingComponent } from './components/paging/paging.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from './directives/directives.module';

@NgModule({
  declarations: [
    ShowTableComponent,
    TableBodyComponent,
    TableCellComponent,
    PagingComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DirectivesModule
  ],
  exports: [
    ShowTableComponent,
    TableBodyComponent,
    TableCellComponent,
    PagingComponent,
    DirectivesModule
  ]
})
export class CustomTableModule { }
