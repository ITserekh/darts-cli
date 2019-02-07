import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShowTableComponent } from './show-table.component';
import { GetDataService } from '../../services/get-data.service';

@NgModule({
  declarations: [ShowTableComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    GetDataService
  ]
})
export class ShowTableModule { }
