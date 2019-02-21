import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableRowDirective, CustomTableDirective, ColumnNameDirective, CellDeffDirective } from '../services/component.directive';

@NgModule({
  declarations: [
    TableRowDirective,
    CustomTableDirective,
    ColumnNameDirective,
    CellDeffDirective,
  ],
  exports: [
    TableRowDirective,
    CustomTableDirective,
    ColumnNameDirective,
    CellDeffDirective
  ],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule { }
