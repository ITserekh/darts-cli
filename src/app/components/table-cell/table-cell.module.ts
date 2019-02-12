import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableCellComponent } from './table-cell.component';
import { DirectivesModule } from '../../derectives/directives.module';

@NgModule({
  declarations: [TableCellComponent],
  imports: [
    CommonModule,
    DirectivesModule
  ]
})
export class TableCellModule { }
